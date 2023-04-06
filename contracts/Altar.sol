// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./interfaces/IFLX.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/ISablier.sol";

contract Altar {
    IERC20 public lit;
    IFLX public flx;
    ISablier public sablier;
    address public treasury;
    uint256 public streamId;

    constructor(address sablier_, address lit_, address flx_) {
        lit = IERC20(lit_);
        sablier = ISablier(sablier_);
        flx = IFLX(flx_);
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
}
