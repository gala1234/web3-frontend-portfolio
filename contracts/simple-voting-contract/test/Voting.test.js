const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting", function () {
  let voting;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const Voting = await ethers.getContractFactory("Voting");
    voting = await Voting.deploy();
    await voting.deployed();
  });

  describe("Voting", function () {
    it("Should allow a user to vote", async function () {
      await voting.connect(addr1).vote(1);
      expect(await voting.hasVoted(addr1.address)).to.equal(true);
      expect(await voting.getVotes(1)).to.equal(1);
    });

    it("Should not allow double voting", async function () {
      await voting.connect(addr1).vote(1);
      await expect(
        voting.connect(addr1).vote(1)
      ).to.be.revertedWith("Already voted");
    });
  });
});