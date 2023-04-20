// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./interfaces/IFLX.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/ISablier.sol";
//import "lib/cow/src/contracts/libraries/GPv2Order.sol";

import {GPv2Order} from "./lib/cow/libraries/GPv2Order.sol";
import {GPv2Settlement} from "./lib/cow/GPv2Settlement.sol";

contract Altar {
    using GPv2Order for *;
    // bytes4(keccak256("isValidSignature(bytes32,bytes)")
    bytes4 internal constant MAGICVALUE = 0x1626ba7e;

    uint256 public constant STANDARD_DELAY = 2 minutes;

    IERC20 public lit;
    IFLX public flx;
    ISablier public sablier;
    address public treasury;
    uint256 public streamId;

    uint256 nextPokeTime;
    uint256 pokeCooldown;

    // The CoW relayer contract to adjust approvals of lit
    // We may want consider option to updating it.
    address public cowRelayerAddress;

    constructor(
        address sablier_,
        address lit_,
        address flx_,
        address cowRelayerAddress_,
        uint256 pokeCooldown_
    ) {
        lit = IERC20(lit_);
        sablier = ISablier(sablier_);
        flx = IFLX(flx_);
        pokeCooldown = pokeCooldown_;
        nextPokeTime = block.timestamp + STANDARD_DELAY;
        cowRelayerAddress = cowRelayerAddress_;
    }

    modifier onlyTreasury() {
        require(msg.sender == treasury, "only treasury");
        _;
    }

    function setTreasury(address treasury_) public {
        require(treasury == address(0), "already setted");
        treasury = treasury_;
    }

    function setStreamId(uint256 streamId_) public onlyTreasury {
        require(streamId == 0, "already setted");
        streamId = streamId_;
    }

    function canPoke() public view returns (bool) {
        return block.timestamp > nextPokeTime;
    }

    function poke() public {
        require(canPoke(), "can't yet");
        nextPokeTime = block.timestamp + pokeCooldown;
        uint256 streamBalance = sablier.balanceOf(streamId, address(this));
        sablier.withdrawFromStream(streamId, streamBalance);
        uint256 approvedBalance = lit.balanceOf(address(this));
        lit.approve(cowRelayerAddress, approvedBalance);
        emit Poked(approvedBalance);
    }

    // @dev sell its entire balance of subject token
    function getTradeableOrder() external view returns (GPv2Order.Data memory) {
        uint256 balance = lit.balanceOf(address(this));
        // ensures that orders queried shortly after one another result in the same hash (to avoid spamming the orderbook)
        uint32 currentTimeBucket = ((uint32(block.timestamp) / 900) + 1) * 900;
        return
            GPv2Order.Data(
                lit,
                IERC20(flx),
                address(this),
                balance,
                1, // 0 buy amount is not allowed
                currentTimeBucket + 900, // between 15 and 30 miunte validity
                keccak256("TradeSubjectForTargetFromAltar"),
                0,
                GPv2Order.KIND_SELL,
                false,
                GPv2Order.BALANCE_ERC20,
                GPv2Order.BALANCE_ERC20
            );
    }

    /**
     * @notice Verifies that the signer is the owner of the signing contract.
     */
    function isValidSignature(
        bytes32 _hash,
        bytes calldata _signature
    ) public view returns (bytes4) {
        //uint256 litBalance = lit.balanceOf(address(this));
        //GPv2Order.Data memory order = GPv2Order.Data(
        //    lit,
        //    IERC20(address(flx)),
        //    address(this),
        //    litBalance,
        //);
        // TODO: must find the proper orderHash computationally
        // TODO: must verify that the hash is as same as the orderHash
        // Then it return the magic value
        // otherwise it returns 0xffffffff
        // Validate signatures
        return MAGICVALUE;
        //return ;
    }

    function burn() public {
        uint256 flxBalance = flx.balanceOf(address(this));
        flx.burn(flxBalance);
    }

    event Poked(uint256 balance);
}
