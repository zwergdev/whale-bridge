// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "./OFT.sol";

contract BabyWhale is OFT {
    uint256 public fee = 0.0000035 ether;

    constructor(address _layerZeroEndpoint) OFT("BabyWhale OFT", "BWHL", _layerZeroEndpoint) {}

    function mint(address _to, uint256 _amount) external payable {
        require(_amount * fee <= msg.value, "Not enough ether");
        _mint(_to, _amount * 10**decimals());
    }

    function setFee(uint256 _fee) external onlyOwner {
        fee = _fee;
    }

    function withdraw() public payable onlyOwner {
        (bool success, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(success);
    }
}
