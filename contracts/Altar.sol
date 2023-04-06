// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./interfaces/IFLX.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/ISablier.sol";

contract Altar {
    IERC20 public lit;
    IFLX public flx;
    ISablier public sablier;

    constructor(address sablier_, address lit_, address flx_) {
        lit = IERC20(lit_);
        sablier = ISablier(sablier_);
        flx = IFLX(flx_);
    }
}
