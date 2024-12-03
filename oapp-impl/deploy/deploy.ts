const { ethers } = require("hardhat");

async function main() {
    const RPSContract = await ethers.getContractFactory("RockPaperScissors");
    const rpsContract = await RPSContract.deploy();

    // For older versions of ethers, use deployed(). For newer versions, use waitForDeployment()
    await rpsContract.deployed ? await rpsContract.deployed() : await rpsContract.waitForDeployment();

    // Get the deployer's address from the signer
    const [deployer] = await ethers.getSigners();
    
    console.log("Contract deployed successfully.");
    console.log(`Deployer: ${deployer.address}`);
    // Handle different ways to get contract address based on ethers version
    const contractAddress = rpsContract.address || await rpsContract.getAddress();
    console.log(`Deployed to: ${contractAddress}`);
    console.log(`Transaction hash: ${rpsContract.deployTransaction?.hash || rpsContract.deploymentTransaction().hash}`);
}

main()
.then(() => process.exit(0))
.catch(error => {
    console.error(error);
    process.exit(1);
});