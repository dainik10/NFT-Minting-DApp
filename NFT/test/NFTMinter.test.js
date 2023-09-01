const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMinter", function () {
  let NFTMinter, nftMinter, owner, addr1;

  beforeEach(async () => {
    NFTMinter = await ethers.getContractFactory("NFTMinter");
    nftMinter = await NFTMinter.deploy();
    await nftMinter.deployed();

    [owner, addr1] = await ethers.getSigners();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await nftMinter.owner()).to.equal(owner.address);
    });

    it("Should have a total supply of zero initially", async function () {
      expect(await nftMinter.totalSupply()).to.equal(0);
    });
  });

//   describe("Minting NFTs", function () {
//     it("Should mint a new NFT", async function () {
//       const tokenURI = "ipfs://ipfs/Qmabcdefgh";
//       await nftMinter.mintNFT(addr1.address, tokenURI);
//       expect(await nftMinter.tokenURI(1)).to.equal(tokenURI);
//     });

//     it("Should assign the NFT to the correct address", async function () {
//       const tokenURI = "ipfs://ipfs/Qmabcdefgh";
//       await nftMinter.mintNFT(addr1.address, tokenURI);
//       expect(await nftMinter.ownerOf(1)).to.equal(addr1.address);
//     });

//     it("Should update the total supply after minting", async function () {
//       const tokenURI = "ipfs://ipfs/Qmabcdefgh";
//       await nftMinter.mintNFT(addr1.address, tokenURI);
//       expect(await nftMinter.totalSupply()).to.equal(1);
//     });
//   });
});
