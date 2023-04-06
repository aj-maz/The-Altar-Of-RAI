// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/ISablier.sol";
import "./Altar.sol";

contract AltarTreasury {
    IERC20 public lit;
    ISablier public sablier;
    uint256 public streamId;

    constructor(address sablier_, address lit_) {
        lit = IERC20(lit_);
        sablier = ISablier(sablier_);
    }

    function startStream(uint256 periode_, address altarAddress_) public {
        uint deposit = lit.balanceOf(address(this));
        lit.approve(address(sablier), deposit);
        uint256 startTime = block.timestamp + 2 minutes;
        uint256 stopTime = startTime + periode_;
        streamId = sablier.createStream(
            altarAddress_,
            deposit,
            address(lit),
            startTime,
            stopTime
        );
        Altar(altarAddress_).setStreamId(streamId);
    }
}
