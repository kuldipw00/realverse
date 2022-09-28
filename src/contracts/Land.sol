 
 //SPDX=License-Identifier: MIT
 pragma solidity ^0.8.0;
 import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
 contract Land is ERC721 {
    uint256 public cost = 1 ether;
    uint256 public maxSupply = 9;
    uint256 public totalSupply = 0;
    uint256 public tokenId=8;
  struct Building {
    string name;
    address owner;
    int256 posX;
    int256 posY;
    int256 posZ;
    uint256 sizeX;
    uint256 sizeY;
    uint256 sizeZ;
    bool isForSale;
 }
 // struct registrationInfo {
 //     address ownerAddrs;
 // land land;
 // }
 struct userInfo {
    address addrs;
    string name;
 }
string aadhar;
  //  modifier onlyOwner {
 //     require(msg.sender == owner);
 // _;
 // }
 // modifier onlyUsers {
 //     require(users[msg.sender].addrs != address(0));
 // _;
 // }
Building[9] public buildings;
constructor(string memory _name, string memory _symbol,uint256 _cost) ERC721(_name,_symbol){
    cost = _cost;
    // owner = _owner;
    
 
    buildings[0]=Building("Residential A", address(0x0), -15,10, 0, 10, 5, 15,true);
    buildings[1]=Building("Residential B", address(0x0), -15,0, 0, 10, 5, 20,true);
    buildings[2]=Building("Shopping Mall", address(0x0), -15,-10, 0, 10, 5, 25,false);
    buildings[3]=Building("Building C", address(0x0), 15, 10,0, 10, 5, 20,true);
       
    buildings[4]=Building("Cinema", address(0x0), 15, 0, 0, 10, 5, 15,false);
    buildings[5]=Building("Building D", address(0x0), 15, -10,0, 10, 5, 15,true);
    buildings[6]=Building("Club", address(0x0), 0, 0, 0, 10,15, 20,false);
    buildings[7]=Building("Residential 1", address(0x0), 0,-15, 0, 10, 5, 15,true);
        
        // buildings.push(
    //     Building("University", address(0x0), -10, 15, 0,
    // );
    // buildings.push(
    //     Building("Shopping Plaza 1", address(0x0), 10, 0,0, 5, 25, 5,false)
    // );
  }
 mapping(address => userInfo) users;
 // mapping(uint256 => registrationInfo) registrationsList;
 function addBuilding(string memory _name,address _owner,int128 x)public returns (Building[9] memory){
    buildings[tokenId]=Building(_name, _owner, 0, x, 0, 10, 5,10,false);
    tokenId=tokenId+1;
    //buildings[tokenId - 1].owner = _owner;
    totalSupply = totalSupply + 1;
    _safeMint(_owner, tokenId);
    //emit Transfer(address(0), _owner, tokenId);
    return buildings;
  }
 function mint(uint256 _id) public payable {
   uint256 supply = totalSupply;
 require(supply <= maxSupply,"Supply ends");
  //require(buildings[_id - 1].owner ==address(0x0),"Address not 0x0");

 
require(msg.value >= cost,"insusficient cost");
    // NOTE: tokenID always starts from 1, but our arraystarts from 0
    buildings[_id - 1].owner = msg.sender;
    totalSupply = totalSupply + 1;
    _safeMint(msg.sender, _id);
  }
 function transferFrom(
    address from,
    address to,
        uint256 tokenId
    ) public override {
    require(
    _isApprovedOrOwner(_msgSender(), tokenId),
    "ERC721: transfer caller is not owner nor approved"
    );
    // Update Building ownership
        buildings[tokenId - 1].owner = to;
        _transfer(from, to, tokenId);
    }
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public override {
        require(
        _isApprovedOrOwner(_msgSender(), tokenId),
        "ERC721: transfer caller is not owner nor approved"
 );
 // Update Building ownership
 buildings[tokenId - 1].owner = to;
 _safeTransfer(from, to, tokenId, _data);
 }
 // Public View Functions
 function getBuildings() public view returns (Building[9]
   memory) {
  return buildings;
 }
 function getBuilding(uint256 _id) public view returns
   (Building memory) {
  return buildings[_id - 1];

 
}
}
// function setForSale(uint256 buildingId) public returns (Building[] memory){
//     buildings[buildingId - 1].isForSale = true;
//     return buildings[buildingId - 1];
//  }
