// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./interfaces/IFLX.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/ISablier.sol";

contract Altar {
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

    event Poked(uint256 balance);
}
