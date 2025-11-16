// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TreeShop
 * @dev Smart contract for purchasing trees and minting carbon credit NFTs
 */
contract TreeShop is ERC721, Ownable {
    uint256 public _treeIdCounter;
    uint256 public _carbonCreditIdCounter;
    
    // Tree types
    enum TreeType { RedOak, Maple }
    
    // Tree information
    struct Tree {
        TreeType treeType;
        uint256 purchaseTimestamp;
        uint256 age; // in years
        uint256 co2AbsorptionRate; // tons per year (in wei for precision)
        uint256 harvestTime; // years until harvest
        uint256 grassGrowth; // tons
        address owner;
        bool exists;
    }
    
    // Carbon Credit NFT information
    struct CarbonCredit {
        uint256 treeId;
        uint256 co2Credit; // tons per year (in wei for precision)
        uint256 year;
        address owner;
        bool exists;
        bool redeemed;
    }
    
    // Tree prices (in wei)
    uint256 public constant RED_OAK_PRICE = 20 ether;
    uint256 public constant MAPLE_PRICE = 22 ether;
    
    // Tree properties
    uint256 public constant RED_OAK_CO2_RATE = 250000000000000000; // 0.25 ton/year
    uint256 public constant MAPLE_CO2_RATE = 350000000000000000; // 0.35 ton/year
    uint256 public constant RED_OAK_HARVEST_TIME = 60; // years
    uint256 public constant MAPLE_HARVEST_TIME = 70; // years
    uint256 public constant RED_OAK_GRASS = 50; // tons
    uint256 public constant MAPLE_GRASS = 60; // tons
    
    // Mappings
    mapping(uint256 => Tree) public trees;
    mapping(uint256 => CarbonCredit) public carbonCredits;
    mapping(address => uint256[]) public userTrees;
    mapping(address => uint256[]) public userCarbonCredits;
    
    // Events
    event TreePurchased(address indexed buyer, uint256 indexed treeId, TreeType treeType, uint256 price);
    event CarbonCreditMinted(address indexed owner, uint256 indexed creditId, uint256 indexed treeId, uint256 year);
    event CarbonCreditRedeemed(address indexed owner, uint256 indexed creditId);
    event TreeAgeUpdated(uint256 indexed treeId, uint256 newAge);
    
    constructor() ERC721("TreeShop Tree", "TREE") Ownable(msg.sender) {}
    
    /**
     * @dev Purchase a tree
     * @param treeType Type of tree to purchase (RedOak or Maple)
     */
    function purchaseTree(TreeType treeType) external payable {
        uint256 price = treeType == TreeType.RedOak ? RED_OAK_PRICE : MAPLE_PRICE;
        require(msg.value >= price, "Insufficient payment");
        
        _treeIdCounter++;
        uint256 newTreeId = _treeIdCounter;
        
        // Create tree
        uint256 co2Rate = treeType == TreeType.RedOak ? RED_OAK_CO2_RATE : MAPLE_CO2_RATE;
        uint256 harvestTime = treeType == TreeType.RedOak ? RED_OAK_HARVEST_TIME : MAPLE_HARVEST_TIME;
        uint256 grassGrowth = treeType == TreeType.RedOak ? RED_OAK_GRASS : MAPLE_GRASS;
        
        trees[newTreeId] = Tree({
            treeType: treeType,
            purchaseTimestamp: block.timestamp,
            age: 0,
            co2AbsorptionRate: co2Rate,
            harvestTime: harvestTime,
            grassGrowth: grassGrowth,
            owner: msg.sender,
            exists: true
        });
        
        // Mint tree NFT
        _safeMint(msg.sender, newTreeId);
        
        // Add to user's trees
        userTrees[msg.sender].push(newTreeId);
        
        emit TreePurchased(msg.sender, newTreeId, treeType, price);
        
        // Refund excess payment
        if (msg.value > price) {
            payable(msg.sender).transfer(msg.value - price);
        }
    }
    
    /**
     * @dev Purchase multiple trees in a batch
     * @param treeTypes Array of tree types to purchase
     */
    function purchaseTreeBatch(TreeType[] calldata treeTypes) external payable {
        uint256 totalCost = 0;
        
        // Calculate total cost
        for (uint256 i = 0; i < treeTypes.length; i++) {
            totalCost += treeTypes[i] == TreeType.RedOak ? RED_OAK_PRICE : MAPLE_PRICE;
        }
        
        require(msg.value >= totalCost, "Insufficient payment");
        
        // Purchase each tree
        for (uint256 i = 0; i < treeTypes.length; i++) {
            _treeIdCounter++;
            uint256 newTreeId = _treeIdCounter;
            
            uint256 co2Rate = treeTypes[i] == TreeType.RedOak ? RED_OAK_CO2_RATE : MAPLE_CO2_RATE;
            uint256 harvestTime = treeTypes[i] == TreeType.RedOak ? RED_OAK_HARVEST_TIME : MAPLE_HARVEST_TIME;
            uint256 grassGrowth = treeTypes[i] == TreeType.RedOak ? RED_OAK_GRASS : MAPLE_GRASS;
            
            trees[newTreeId] = Tree({
                treeType: treeTypes[i],
                purchaseTimestamp: block.timestamp,
                age: 0,
                co2AbsorptionRate: co2Rate,
                harvestTime: harvestTime,
                grassGrowth: grassGrowth,
                owner: msg.sender,
                exists: true
            });
            
            _safeMint(msg.sender, newTreeId);
            userTrees[msg.sender].push(newTreeId);
            
            uint256 price = treeTypes[i] == TreeType.RedOak ? RED_OAK_PRICE : MAPLE_PRICE;
            emit TreePurchased(msg.sender, newTreeId, treeTypes[i], price);
        }
        
        // Refund excess payment
        if (msg.value > totalCost) {
            payable(msg.sender).transfer(msg.value - totalCost);
        }
    }
    
    /**
     * @dev Mint a carbon credit NFT for a tree (can be called annually)
     * @param treeId ID of the tree
     * @param year Year for which the carbon credit is being minted
     */
    function mintCarbonCredit(uint256 treeId, uint256 year) external {
        require(trees[treeId].exists, "Tree does not exist");
        require(trees[treeId].owner == msg.sender, "Not the tree owner");
        require(year >= 2020 && year <= 2100, "Invalid year");
        
        _carbonCreditIdCounter++;
        uint256 newCreditId = _carbonCreditIdCounter;
        
        carbonCredits[newCreditId] = CarbonCredit({
            treeId: treeId,
            co2Credit: trees[treeId].co2AbsorptionRate,
            year: year,
            owner: msg.sender,
            exists: true,
            redeemed: false
        });
        
        userCarbonCredits[msg.sender].push(newCreditId);
        
        emit CarbonCreditMinted(msg.sender, newCreditId, treeId, year);
    }
    
    /**
     * @dev Redeem a carbon credit NFT
     * @param creditId ID of the carbon credit
     */
    function redeemCarbonCredit(uint256 creditId) external {
        require(carbonCredits[creditId].exists, "Credit does not exist");
        require(carbonCredits[creditId].owner == msg.sender, "Not the credit owner");
        require(!carbonCredits[creditId].redeemed, "Credit already redeemed");
        
        carbonCredits[creditId].redeemed = true;
        
        emit CarbonCreditRedeemed(msg.sender, creditId);
    }
    
    /**
     * @dev Update tree age (should be called periodically, e.g., by an oracle or admin)
     * @param treeId ID of the tree
     */
    function updateTreeAge(uint256 treeId) external onlyOwner {
        require(trees[treeId].exists, "Tree does not exist");
        
        uint256 timeElapsed = block.timestamp - trees[treeId].purchaseTimestamp;
        uint256 yearsElapsed = timeElapsed / 365 days;
        
        trees[treeId].age = yearsElapsed;
        
        emit TreeAgeUpdated(treeId, yearsElapsed);
    }
    
    /**
     * @dev Get all trees owned by a user
     * @param user Address of the user
     */
    function getUserTrees(address user) external view returns (uint256[] memory) {
        return userTrees[user];
    }
    
    /**
     * @dev Get all carbon credits owned by a user
     * @param user Address of the user
     */
    function getUserCarbonCredits(address user) external view returns (uint256[] memory) {
        return userCarbonCredits[user];
    }
    
    /**
     * @dev Get detailed tree information
     * @param treeId ID of the tree
     */
    function getTreeDetails(uint256 treeId) external view returns (
        TreeType treeType,
        uint256 age,
        uint256 co2AbsorptionRate,
        uint256 harvestTime,
        uint256 grassGrowth,
        address treeOwner
    ) {
        require(trees[treeId].exists, "Tree does not exist");
        Tree memory tree = trees[treeId];
        return (
            tree.treeType,
            tree.age,
            tree.co2AbsorptionRate,
            tree.harvestTime,
            tree.grassGrowth,
            tree.owner
        );
    }
    
    /**
     * @dev Get detailed carbon credit information
     * @param creditId ID of the carbon credit
     */
    function getCarbonCreditDetails(uint256 creditId) external view returns (
        uint256 treeId,
        uint256 co2Credit,
        uint256 year,
        address creditOwner,
        bool redeemed
    ) {
        require(carbonCredits[creditId].exists, "Credit does not exist");
        CarbonCredit memory credit = carbonCredits[creditId];
        return (
            credit.treeId,
            credit.co2Credit,
            credit.year,
            credit.owner,
            credit.redeemed
        );
    }
    
    /**
     * @dev Withdraw contract balance (only owner)
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        payable(owner()).transfer(balance);
    }
    
    /**
     * @dev Get current tree count
     */
    function getTreeCount() external view returns (uint256) {
        return _treeIdCounter;
    }
    
    /**
     * @dev Get current carbon credit count
     */
    function getCarbonCreditCount() external view returns (uint256) {
        return _carbonCreditIdCounter;
    }
    
    // Override required functions
    function _update(address to, uint256 tokenId, address auth)
        internal
        override
        returns (address)
    {
        address from = _ownerOf(tokenId);
        address previousOwner = super._update(to, tokenId, auth);
        
        // Update tree owner
        if (trees[tokenId].exists) {
            trees[tokenId].owner = to;
        }
        
        return previousOwner;
    }
}
