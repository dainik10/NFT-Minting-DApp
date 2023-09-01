const { ethers } = require("hardhat");
// imports the ethers module from the Hardhat library,

async function main() {
  const NFTMinter = await ethers.getContractFactory("NFTMinter");
  //retrieves the contract factory for the NFTMinter contract. This factory is used to create instances of the contract.
  const nftMinter = await NFTMinter.deploy();
  //deploys a new instance of the NFTMinter contract.
  await nftMinter.deployed();
  //waits for the deployment to complete and ensures that the contract is successfully deployed.
  console.log("NFTMinter deployed to:", nftMinter.address);
}
// It handles the asynchronous execution of the function and handles any errors that may occur.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
