// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AuctionHouse {
    // --- Data ---
    struct Bid {
        // Bid size
        uint256 bidAmount; // [rad]
        // How much collateral is sold in an auction
        uint256 amountToSell; // [wad]
        // Who the high bidder is
        address highBidder;
        // When the latest bid expires and the auction can be settled
        uint48 bidExpiry; // [unix epoch time]
        // Hard deadline for the auction after which no more bids can be placed
        uint48 auctionDeadline; // [unix epoch time]
    }

    // Bid data for each separate auction
    mapping(uint256 => Bid) public bids;

    // Minimum bid increase compared to the last bid in order to take the new one in consideration
    uint256 public bidIncrease = 1.05E18; // [wad]
    // How long the auction lasts after a new bid is submitted
    uint48 public bidDuration = 3 hours; // [seconds]
    // Total length of the auction
    uint48 public totalAuctionLength = 2 days; // [seconds]
    // Number of auctions started up until now
    uint256 public auctionsStarted = 0;

    IERC20 public bidToken; // flx
    IERC20 public auctionedToken; // kite
    address public altarAddress;

    event StartAuction(
        uint256 id,
        uint256 auctionsStarted,
        uint256 amountToSell,
        uint256 auctionDeadline
    );

    constructor(
        address bidToken_,
        address auctionedToken_,
        address altarAddress_
    ) {
        bidToken = IERC20(bidToken_);
        auctionedToken = IERC20(auctionedToken_);
        altarAddress = altarAddress_;
    }

    modifier onlyAltar() {
        require(msg.sender == altarAddress, "unauthorized!");
        _;
    }

    function startAuction(
        uint256 amountToSell
    ) public onlyAltar returns (uint256 id) {
        require(auctionsStarted < type(uint256).max, "overflow");
        require(amountToSell > 0, "null-amount-sold");
        id = ++auctionsStarted;

        bids[id].bidAmount = 0;
        bids[id].amountToSell = amountToSell;
        bids[id].highBidder = msg.sender;
        bids[id].auctionDeadline = uint48(block.timestamp) + totalAuctionLength;

        auctionedToken.transferFrom(msg.sender, address(this), amountToSell);

        emit StartAuction(
            id,
            auctionsStarted,
            amountToSell,
            bids[id].auctionDeadline
        );
    }
}
