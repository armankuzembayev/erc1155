import { task } from "hardhat/config";
import * as Configs from "../config"


task("mint", "Mint NFT")
    .addParam("token", "Token address")
    .addParam("to", "Address where to send NFT")
    .addParam("id", "Token id")
    .addParam("amount", "How much")
    .setAction(async  (taskArgs, { ethers }) => {

    const contract = await ethers.getContractAt("Erc1155", taskArgs.token);
    
    await contract.mint(taskArgs.to, taskArgs.id, taskArgs.amount);
});