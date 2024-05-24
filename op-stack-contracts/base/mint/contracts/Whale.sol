// SPDX-License-Identifier: MIT
import "./ONFT721.sol";

pragma solidity ^0.8.18;

/// @title Interface of Whale, which follows the UniversalONFT standard
contract Whale is ONFT721 {
    uint256 public fee = 0.0001 ether;

    uint256 public nextMintId;
    uint256 public maxMintId;

    /// @notice Constructor for the UniversalONFT
    /// @param _layerZeroEndpoint handles message transmission across chains
    /// @param _startMintId the starting mint number on this chain
    /// @param _endMintId the max number of mints on this chain
    constructor(
        uint256 _minGasToTransfer,
        address _layerZeroEndpoint,
        uint256 _startMintId,
        uint256 _endMintId
    ) ONFT721("Whale ONFT", "WHL", _minGasToTransfer, _layerZeroEndpoint) {
        nextMintId = _startMintId;
        maxMintId = _endMintId;
    }

    function mint() external payable {
        require(msg.value >= fee, "Not enough ether sent");
        require(nextMintId <= maxMintId, "Too many, bruv");
        uint256 newId = nextMintId;
        nextMintId++;

        _safeMint(msg.sender, newId);
    }

    function estimateGasBridgeFee(
        uint16 _dstChainId,
        bool _useZro,
        bytes memory _adapterParams
    ) public view virtual returns (uint256 nativeFee, uint256 zroFee) {
        bytes memory payload = abi.encode(msg.sender, 0);
        return lzEndpoint.estimateFees(_dstChainId, payable(address(this)), payload, _useZro, _adapterParams);
    }

    function bridgeGas(
        uint16 _dstChainId,
        address _zroPaymentAddress,
        bytes memory _adapterParams
    ) public payable {
        _checkGasLimit(_dstChainId, FUNCTION_TYPE_SEND, _adapterParams, dstChainIdToTransferGas[_dstChainId]);
        _lzSend(
            _dstChainId,
            abi.encode(msg.sender, 0),
            payable(address(this)),
            _zroPaymentAddress,
            _adapterParams,
            msg.value
        );
    }

    function tokenURI(uint256 id) public view virtual override returns (string memory) {
        return string(abi.encodePacked(_baseURI(), Strings.toString(id), ".json"));
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://bafybeifjarbjpm3htszbclcmyurv4nplmri7scgjbdkh6eclpvzq6itgw4/";

        
    }

    function withdraw() public payable onlyOwner {
        (bool success, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(success);
    }
    
    function setFee(uint256 _fee) external onlyOwner {
        fee = _fee;
    }
}

