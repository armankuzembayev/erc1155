const { expect } = require("chai");
const { ethers } = require("hardhat");

import * as Configs from "../config"

describe("ERC1155", function ()  {

    let Token: any;
    let hardhatToken: any;
    let owner: any;
    let addr1: any;
    let zeroAddress = ethers.utils.getAddress(Configs.zeroAddress)

    beforeEach(async function() {
        [owner, addr1] = await ethers.getSigners();

        Token = await ethers.getContractFactory("Erc1155");
        const name = Configs.name;
        const symbol = Configs.symbol;
        const baseUri = Configs.baseUri;
        const maxElements = Configs.maxElements;

        hardhatToken = await Token.deploy(name, symbol, baseUri, maxElements);
        await hardhatToken.deployed();
    });

    describe("Deployment", function() {

        it("Should initialize correctly", async function() {
            expect(await hardhatToken.name()).to.equal(Configs.name);
            expect(await hardhatToken.symbol()).to.equal(Configs.symbol);
            expect(await hardhatToken.baseUri()).to.equal(Configs.baseUri);
            expect(await hardhatToken.maxElements()).to.equal(Configs.maxElements);
            expect(await hardhatToken.supportsInterface(0xffffffff)).to.be.false;
            expect(await hardhatToken.supportsInterface(0xd9b67a26)).to.be.true;
            expect(await hardhatToken.supportsInterface(0x01ffc9a7)).to.be.true;
        });
    });

    describe("Setters", function() {

        it("Should set correctly", async function() {
            await hardhatToken.setName("Arman");
            expect(await hardhatToken.name()).to.equal("Arman");

            await hardhatToken.setSymbol("ART");
            expect(await hardhatToken.symbol()).to.equal("ART");

            await hardhatToken.setBaseUri("uri");
            expect(await hardhatToken.baseUri()).to.equal("uri");

            await hardhatToken.setMaxElements(1000);
            expect(await hardhatToken.maxElements()).to.equal(1000);
        });
    });

    describe("mint", function() {

        it("Should revert", async function() {
            await expect(hardhatToken.mint(zeroAddress, 1, 1)).to.be.revertedWith("Mint to zero address");
            await expect(hardhatToken.mint(addr1.address, 1, 0)).to.be.revertedWith("Amount should be positive");
            await expect(hardhatToken.mint(addr1.address, 0, 1)).to.be.revertedWith("Id should be positive");
            await expect(hardhatToken.mint(addr1.address, 100, 1)).to.be.revertedWith("Cannot mint");
        });

        it("Should mint and get tokenUri", async function() {
            await hardhatToken.mint(addr1.address, 1, 1);

            expect(await hardhatToken.uri(1)).to.be.equal(
                Configs.baseUri + "1.json"
            );
        });
    });
});