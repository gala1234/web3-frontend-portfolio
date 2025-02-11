const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Crowdfunding", function () {
  let crowdfunding;
  let owner;
  let addr1;
  let addr2;
  let oneDay = 24 * 60 * 60;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const Crowdfunding = await ethers.getContractFactory("Crowdfunding");
    crowdfunding = await Crowdfunding.deploy();
    await crowdfunding.deployed();
  });

  describe("Campaign Creation", function () {
    it("Should create a new campaign", async function () {
      const goal = ethers.utils.parseEther("1");
      const deadline = Math.floor(Date.now() / 1000) + oneDay;

      await crowdfunding.createCampaign(goal, deadline);
      const campaign = await crowdfunding.campaigns(0);

      expect(campaign.creator).to.equal(owner.address);
      expect(campaign.goal).to.equal(goal);
      expect(campaign.deadline).to.equal(deadline);
    });
  });

  describe("Contributing", function () {
    it("Should allow contributions to a campaign", async function () {
      const goal = ethers.utils.parseEther("1");
      const deadline = Math.floor(Date.now() / 1000) + oneDay;

      await crowdfunding.createCampaign(goal, deadline);
      await crowdfunding.connect(addr1).contribute(0, { value: ethers.utils.parseEther("0.5") });

      const campaign = await crowdfunding.campaigns(0);
      expect(campaign.currentAmount).to.equal(ethers.utils.parseEther("0.5"));
    });
  });

  describe("Claiming Funds", function () {
    it("Should allow creator to claim funds when goal is reached", async function () {
      const goal = ethers.utils.parseEther("1");
      const deadline = Math.floor(Date.now() / 1000) + oneDay;

      await crowdfunding.createCampaign(goal, deadline);
      await crowdfunding.connect(addr1).contribute(0, { value: goal });

      await ethers.provider.send("evm_increaseTime", [oneDay + 1]);
      await ethers.provider.send("evm_mine");

      await expect(() =>
        crowdfunding.claimFunds(0)
      ).to.changeEtherBalance(owner, goal);
    });
  });
});