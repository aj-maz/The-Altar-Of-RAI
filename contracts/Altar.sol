// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./interfaces/IFLX.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/ISablier.sol";
import "./interfaces/IAuctionHouse.sol";
import "./interfaces/IEasyAuction.sol";

import {GPv2Order} from "./lib/cow/libraries/GPv2Order.sol";
import {GPv2Settlement} from "./lib/cow/GPv2Settlement.sol";
import {GPv2EIP1271} from "./lib/cow/interfaces/GPv2EIP1271.sol";

contract Altar {
    using GPv2Order for *;

    uint256 public constant STANDARD_DELAY = 2 minutes;

    IERC20 public lit;
    IERC20 public flx;
    ISablier public sablier;
    IEasyAuction public auctionHouse;

    address public treasury;
    uint256 public streamId;

    uint256 public nextPokeTime;
    uint256 public pokeCooldown;
    uint256 public auctionTime;

    constructor(
        address sablier_,
        address lit_,
        address flx_,
        address treasury_,
        uint256 pokeCooldown_,
        uint256 auctionTime_,
        address gnosisAuctionAddress_
    ) {
        lit = IERC20(lit_);
        sablier = ISablier(sablier_);
        flx = IERC20(flx_);
        pokeCooldown = pokeCooldown_;
        nextPokeTime = block.timestamp + STANDARD_DELAY + pokeCooldown;
        treasury = treasury_;
        auctionHouse = IEasyAuction(gnosisAuctionAddress_);
        auctionTime = auctionTime_;
    }

    modifier onlyTreasury() {
        require(msg.sender == treasury, "only treasury");
        _;
    }

    function setStreamId(uint256 streamId_) public onlyTreasury {
        require(streamId == 0, "already setted");
        streamId = streamId_;
    }

    function canPoke() public view returns (bool) {
        return block.timestamp > nextPokeTime;
    }

    function calculateAuctionedSellAmount()
        public
        view
        returns (uint96 auctionedSellAmount)
    {
        uint256 totalBalance = lit.balanceOf(address(this));
        uint256 feeDenominator = auctionHouse.FEE_DENOMINATOR();
        uint256 feeNumerator = auctionHouse.feeNumerator();

        auctionedSellAmount = uint96(
            (totalBalance * feeDenominator) / (feeDenominator + feeNumerator)
        );
    }

    // TODO: let's put streamId as an argument instead of state
    function poke() public {
        require(canPoke(), "can't yet");
        nextPokeTime = block.timestamp + pokeCooldown;
        uint256 streamBalance = sablier.balanceOf(streamId, address(this));
        sablier.withdrawFromStream(streamId, streamBalance);
        uint256 approvedBalance = lit.balanceOf(address(this));
        lit.approve(address(auctionHouse), approvedBalance);
        uint96 auctionedSellAmount = calculateAuctionedSellAmount();

        auctionHouse.initiateAuction(
            lit,
            flx,
            0,
            block.timestamp + auctionTime,
            auctionedSellAmount,
            1,
            1,
            1,
            true,
            address(0),
            bytes("0x")
        );
        emit Poked(approvedBalance);
    }

    event Poked(uint256 balance);
}
