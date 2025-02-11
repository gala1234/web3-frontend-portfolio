// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    mapping(address => bool) public hasVoted;
    mapping(uint256 => uint256) public votesReceived;
    
    event VoteCast(address indexed voter, uint256 indexed proposal);
    
    function vote(uint256 proposalId) external {
        require(!hasVoted[msg.sender], "Already voted");
        
        hasVoted[msg.sender] = true;
        votesReceived[proposalId]++;
        
        emit VoteCast(msg.sender, proposalId);
    }
    
    function getVotes(uint256 proposalId) external view returns (uint256) {
        return votesReceived[proposalId];
    }
}