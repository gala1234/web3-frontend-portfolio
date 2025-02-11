const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lottery", function () {
  let lottery;
  let owner;
  let addr1;
  let addr2;
  let vrfCoordinator;
  let subscriptionId = 1;
  let keyHash = "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15";

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    
    // Deploy mock VRF Coordinator
    const MockVRFCoordinator = await ethers.getContractFactory("MockVRFCoordinator");
    vrfCoordinator = await MockVRFCoordinator.deploy();
    await vrfCoordinator.deployed();

    // Deploy Lottery contract
    const Lottery = await ethers.getContractFactory("Lottery");
    lottery = await Lottery.deploy(vrfCoordinator.address, subscriptionId, keyHash);
    await lottery.deployed();
  });

  describe("Lottery Management", function () {
    it("Should allow owner to start lottery", async function () {
      const ticketPrice = ethers.utils.parseEther("0.01");
      await lottery.startLottery(ticketPrice);
      expect(await lottery.ticketPrice()).to.equal(ticketPrice);
      expect(await lottery.lotteryId()).to.equal(1);
    });

    it("Should allow players to buy tickets", async function () {
      const ticketPrice = ethers.utils.parseEther("0.01");
      await lottery.startLottery(ticketPrice);
      await lottery.connect(addr1).buyTicket({ value: ticketPrice });
      
      const player = await lottery.players(0);
      expect(player).to.equal(addr1.address);
    });

    it("Should not allow non-owner to start lottery", async function () {
      const ticketPrice = ethers.utils.parseEther("0.01");
      await expect(
        lottery.connect(addr1).startLottery(ticketPrice)
      ).to.be.revertedWith("Only owner can start lottery");
    });

    it("Should not allow buying ticket with incorrect price", async function () {
      const ticketPrice = ethers.utils.parseEther("0.01");
      await lottery.startLottery(ticketPrice);
      await expect(
        lottery.connect(addr1).buyTicket({ value: ethers.utils.parseEther("0.02") })
      ).to.be.revertedWith("Incorrect ticket price");
    });
  });
});