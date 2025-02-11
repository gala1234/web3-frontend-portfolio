// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Crowdfunding {
    struct Campaign {
        address creator;
        uint256 goal;
        uint256 deadline;
        uint256 currentAmount;
        bool claimed;
    }

    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => mapping(address => uint256)) public contributions;
    uint256 public campaignCount;

    event CampaignCreated(uint256 indexed campaignId, address creator, uint256 goal);
    event ContributionMade(uint256 indexed campaignId, address contributor, uint256 amount);
    event FundsClaimed(uint256 indexed campaignId, address creator, uint256 amount);

    function createCampaign(uint256 _goal, uint256 _deadline) external {
        require(_goal > 0, "Goal must be greater than 0");
        require(_deadline > block.timestamp, "Deadline must be in the future");

        uint256 campaignId = campaignCount++;
        campaigns[campaignId] = Campaign({
            creator: msg.sender,
            goal: _goal,
            deadline: _deadline,
            currentAmount: 0,
            claimed: false
        });

        emit CampaignCreated(campaignId, msg.sender, _goal);
    }

    function contribute(uint256 _campaignId) external payable {
        Campaign storage campaign = campaigns[_campaignId];
        require(block.timestamp < campaign.deadline, "Campaign has ended");

        campaign.currentAmount += msg.value;
        contributions[_campaignId][msg.sender] += msg.value;

        emit ContributionMade(_campaignId, msg.sender, msg.value);
    }

    function claimFunds(uint256 _campaignId) external {
        Campaign storage campaign = campaigns[_campaignId];
        require(msg.sender == campaign.creator, "Only creator can claim");
        require(block.timestamp >= campaign.deadline, "Campaign not ended");
        require(campaign.currentAmount >= campaign.goal, "Goal not reached");
        require(!campaign.claimed, "Funds already claimed");

        campaign.claimed = true;
        payable(campaign.creator).transfer(campaign.currentAmount);

        emit FundsClaimed(_campaignId, campaign.creator, campaign.currentAmount);
    }
}