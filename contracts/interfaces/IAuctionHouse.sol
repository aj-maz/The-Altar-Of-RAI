interface IAuctionHouse {
    event StartAuction(
        uint256 id,
        uint256 auctionsStarted,
        uint256 amountToSell,
        uint256 auctionDeadline
    );

    event IncreaseBidSize(
        uint256 indexed id,
        address highBidder,
        uint256 bidAmount,
        uint256 bidExpiry
    );

    event SettleAuction(uint256 indexed id);

    event RestartAuction(uint256 indexed id, uint256 auctionDeadline);

    event BiddingTokenWithdraw(address indexed user);

    function startAuction(uint256 amountToSell) external returns (uint256 id);

    function increaseBidSize(uint256 id, uint256 bidAmount) external;

    function settleAuction(uint256 id) external;

    function restartAuction(uint256 id) external;

    function withdrawBididngToken() external;
}
