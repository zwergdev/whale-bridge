// SPDX-License-Identifier: MIT
pragma solidity >=0.8.12;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/ILayerZeroEndpoint.sol";
import "./interfaces/ILayerZeroReceiver.sol";

contract WhaleSendMessage is Ownable, ILayerZeroReceiver {
    ILayerZeroEndpoint public endpoint;
    uint256 public cost = 0.00025 ether;
    mapping(address => string) public lastMessage;

    uint256 gas = 220000;

    // When just deploying, mint a certain number of tokens for the owner
    constructor(address _endpoint) {
        endpoint = ILayerZeroEndpoint(_endpoint);
    }

    function lzReceive(
        uint16 _dstChainId,
        bytes memory _from,
        uint64,
        bytes memory _payload
    ) external override {
        require(msg.sender == address(endpoint));
        address from;

        assembly {
            from := mload(add(_from, 20))
        }
        (address toAddress, string memory message) = abi.decode(_payload, (address, string));
        // mint the tokens
        lastMessage[toAddress] = message;
    }

    function estimateFees(
        uint16 _dstChainId,
        address _userApplication,
        bytes calldata _payload,
        bool _payInZRO,
        bytes calldata _adapterParams
    ) external view returns (uint256 nativeFee, uint256 zroFee) {
        return endpoint.estimateFees(_dstChainId, _userApplication, _payload, _payInZRO, _adapterParams);
    }

    function sendMessage(
        string memory message,
        uint16 destChainId,
        bytes calldata _destination
    ) public payable {
        bytes memory payload = abi.encode(msg.sender, message);

        uint16 version = 2;
        bytes memory adapterParams = abi.encodePacked(version, gas);

        (uint256 messageFee, ) = endpoint.estimateFees(destChainId, address(this), payload, false, adapterParams);
        require(msg.value >= messageFee, "Must send enough value to cover messageFee");
        endpoint.send{value: msg.value - cost}(
            destChainId,
            _destination,
            payload,
            payable(msg.sender),
            address(0x0),
            adapterParams
        );
    }

    function setCost(uint256 _newCost) public onlyOwner {
        cost = _newCost;
    }

    function withdraw() public payable onlyOwner {
        (bool success, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(success);
    }
}
