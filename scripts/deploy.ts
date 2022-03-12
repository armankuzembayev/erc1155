import { ethers } from "hardhat";

import * as Configs from "../config"

async function main() {

  const Erc1155 = await ethers.getContractFactory("Erc1155");
  const erc1155 = await Erc1155.deploy
  (
    Configs.name,
    Configs.symbol,
    Configs.baseUri,
    Configs.maxElements
  );

  await erc1155.deployed();

  console.log("ERC1155 deployed to:", erc1155.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
