// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../interfaces/IONFT721Core.sol";

pragma solidity ^0.8.18;

interface IONFT721 is IONFT721Core, IERC721 {}
