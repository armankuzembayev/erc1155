//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Erc1155 is ERC1155, AccessControl {

    bytes32 public constant ADMIN = keccak256("ADMIN");
    string public constant EXTENSION = ".json";

    string public name;
    string public symbol;
    string public baseUri;
    uint256 public maxElements;

    constructor (
        string memory _name, 
        string memory _symbol, 
        string memory _uri,
        uint256 _maxElements
    ) ERC1155(_uri) {
        _setupRole(ADMIN, msg.sender);
        
        name = _name;
        symbol = _symbol;
        baseUri = _uri;
        maxElements = _maxElements;
    }

    function mint(address _to, uint _id, uint _amount) public {
        require(_to != address(0), "Mint to zero address");
        require(_amount > 0, "Amount should be positive");
        require(_id > 0, "Id should be positive");
        require(_id <= maxElements, "Cannot mint");

        _mint(_to, _id, _amount, "");
    }

    function uri(uint256 _tokenId) public override view returns (string memory) {
        return string(abi.encodePacked(baseUri, Strings.toString(_tokenId), EXTENSION));
    }

    function supportsInterface(bytes4 _interfaceId) public view virtual override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(_interfaceId);
    }

    function setName(string memory _name) public onlyRole(ADMIN) {
        name = _name;
    }

    function setSymbol(string memory _symbol) public onlyRole(ADMIN) {
        symbol = _symbol;
    }

    function setBaseUri(string memory _uri) public onlyRole(ADMIN) {
        _setURI(_uri);
        baseUri = _uri;
    }

    function setMaxElements(uint256 _maxElements) public onlyRole(ADMIN) {
        maxElements = _maxElements;
    }
}
