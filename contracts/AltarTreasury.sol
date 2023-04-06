// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/ISablier.sol";

contract AltarTreasury {
    IERC20 public lit;
    ISablier public sablier;

    constructor(address sablier_, address lit_) {
        lit = IERC20(lit_);
        sablier = ISablier(sablier_);
    }
}
