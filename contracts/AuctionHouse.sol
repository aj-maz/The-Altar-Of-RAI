// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IAuctionHouse.sol";

contract AuctionHouse is IAuctionHouse {
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
        bool settled;
    }

    // Bid data for each separate auction
    mapping(uint256 => Bid) public bids;

    // Bid token balances
    mapping(address => uint256) public bidTokenBalances;

    // Minimum bid increase compared to the last bid in order to take the new one in consideration
    uint256 public bidIncrease = 5E17; // [wad]
    // How long the auction lasts after a new bid is submitted
    uint48 public bidDuration = 3 minutes; // [seconds]
    // Total length of the auction
    uint48 public totalAuctionLength = 15 minutes; // [seconds]
    // Number of auctions started up until now
    uint256 public auctionsStarted = 0;

    IERC20 public bidToken; // flx
    IERC20 public auctionedToken; // kite
    address public altarAddress;

    constructor(address bidToken_, address auctionedToken_) {
        bidToken = IERC20(bidToken_);
        auctionedToken = IERC20(auctionedToken_);
    }

    function initialize(address altarAddress_) public {
        require(altarAddress == address(0), "altar_setted!");
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

    function increaseBidSize(uint256 id, uint256 bidAmount) external {
        require(bids[id].highBidder != address(0), "high-bidder-not-set"); // needed
        require(
            bids[id].auctionDeadline > block.timestamp ||
                bids[id].bidExpiry > block.timestamp,
            "auction-already-expired"
        );

        require(
            bidAmount >= bids[id].bidAmount + bidIncrease,
            "insufficient-increase"
        );
        bidTokenBalances[bids[id].highBidder] += bids[id].bidAmount;
        uint256 bidderInternalBalance = bidTokenBalances[msg.sender];

        if (msg.sender != bids[id].highBidder) {
            bids[id].highBidder = msg.sender;
        }
        if (bidderInternalBalance >= bidAmount) {
            bidTokenBalances[msg.sender] -= bidAmount;
        } else {
            bidTokenBalances[msg.sender] = 0;
            bidToken.transferFrom(
                msg.sender,
                address(this),
                bidAmount - bidderInternalBalance
            );
        }
        bids[id].bidAmount = bidAmount;
        bids[id].bidExpiry = uint48(block.timestamp) + bidDuration;
        emit IncreaseBidSize(id, msg.sender, bidAmount, bids[id].bidExpiry);
    }

    function settleAuction(uint256 id) external {
        require(
            bids[id].bidExpiry != 0 &&
                (bids[id].bidExpiry < block.timestamp &&
                    bids[id].auctionDeadline < block.timestamp),
            "not-finished"
        );
        require(!bids[id].settled, "already-settled");
        auctionedToken.transfer(bids[id].highBidder, bids[id].amountToSell);
        bidToken.transfer(altarAddress, bids[id].bidAmount);
        bids[id].settled = true;
        emit SettleAuction(id);
    }

    function restartAuction(uint256 id) external {
        require(bids[id].auctionDeadline < block.timestamp, "not-finished");
        require(bids[id].bidExpiry == 0, "bid-already-placed");
        bids[id].auctionDeadline = uint48(block.timestamp) + totalAuctionLength;
        emit RestartAuction(id, bids[id].auctionDeadline);
    }

    function withdrawBididngToken() external {
        uint256 userBalance = bidTokenBalances[msg.sender];
        bidTokenBalances[msg.sender] = 0;
        bidToken.transfer(msg.sender, userBalance);
        emit BiddingTokenWithdraw(msg.sender);
    }
}
