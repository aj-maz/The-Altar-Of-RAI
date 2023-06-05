pragma solidity 0.8.18;
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract EasyAuction {
    using SafeERC20 for IERC20;

    event NewAuction(
        uint256 indexed auctionId,
        IERC20 indexed _auctioningToken,
        IERC20 indexed _biddingToken,
        uint256 orderCancellationEndDate,
        uint256 auctionEndDate,
        uint64 userId,
        uint96 _auctionedSellAmount,
        uint96 _minBuyAmount,
        uint256 minimumBiddingAmountPerOrder,
        uint256 minFundingThreshold,
        address allowListContract,
        bytes allowListData
    );

    uint256 public feeNumerator = 0;
    uint256 public constant FEE_DENOMINATOR = 1000;
    uint256 public auctionCounter;

    constructor() {}

    function initiateAuction(
        IERC20 _auctioningToken,
        IERC20 _biddingToken,
        uint256 orderCancellationEndDate,
        uint256 auctionEndDate,
        uint96 _auctionedSellAmount,
        uint96 _minBuyAmount,
        uint256 minimumBiddingAmountPerOrder,
        uint256 minFundingThreshold,
        bool isAtomicClosureAllowed,
        address accessManagerContract,
        bytes memory accessManagerContractData
    ) public returns (uint256) {
        // withdraws sellAmount + fees
        _auctioningToken.safeTransferFrom(
            msg.sender,
            address(this),
            (_auctionedSellAmount * (FEE_DENOMINATOR + feeNumerator)) /
                (FEE_DENOMINATOR) //[0]
        );
        require(_auctionedSellAmount > 0, "cannot auction zero tokens");
        require(_minBuyAmount > 0, "tokens cannot be auctioned for free");
        require(
            minimumBiddingAmountPerOrder > 0,
            "minimumBiddingAmountPerOrder is not allowed to be zero"
        );
        require(
            orderCancellationEndDate <= auctionEndDate,
            "time periods are not configured correctly"
        );
        require(
            auctionEndDate > block.timestamp,
            "auction end date must be in the future"
        );
        emit NewAuction(
            auctionCounter,
            _auctioningToken,
            _biddingToken,
            orderCancellationEndDate,
            auctionEndDate,
            1,
            _auctionedSellAmount,
            _minBuyAmount,
            minimumBiddingAmountPerOrder,
            minFundingThreshold,
            accessManagerContract,
            accessManagerContractData
        );
        return auctionCounter;
    }
}
