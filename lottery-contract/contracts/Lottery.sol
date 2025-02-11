// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

contract Lottery is VRFConsumerBaseV2 {
    VRFCoordinatorV2Interface COORDINATOR;

    uint64 private subscriptionId;
    bytes32 private keyHash;
    uint32 private callbackGasLimit = 100000;
    uint16 private requestConfirmations = 3;
    uint32 private numWords = 1;

    uint256 public ticketPrice;
    uint256 public lotteryId;
    address public owner;
    address[] public players;
    mapping(uint256 => address) public winners;
    mapping(uint256 => uint256) private requestIds;

    event LotteryStarted(uint256 indexed lotteryId, uint256 ticketPrice);
    event PlayerJoined(uint256 indexed lotteryId, address player);
    event WinnerSelected(uint256 indexed lotteryId, address winner);

    constructor(address vrfCoordinator, uint64 _subscriptionId, bytes32 _keyHash) 
        VRFConsumerBaseV2(vrfCoordinator)
    {
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        subscriptionId = _subscriptionId;
        keyHash = _keyHash;
        owner = msg.sender;
    }

    function startLottery(uint256 _ticketPrice) external {
        require(msg.sender == owner, "Only owner can start lottery");
        require(players.length == 0, "Previous lottery not finished");

        ticketPrice = _ticketPrice;
        lotteryId++;

        emit LotteryStarted(lotteryId, ticketPrice);
    }

    function buyTicket() external payable {
        require(ticketPrice > 0, "Lottery not started");
        require(msg.value == ticketPrice, "Incorrect ticket price");

        players.push(msg.sender);
        emit PlayerJoined(lotteryId, msg.sender);
    }

    function endLottery() external {
        require(msg.sender == owner, "Only owner can end lottery");
        require(players.length > 0, "No players in lottery");

        uint256 requestId = COORDINATOR.requestRandomWords(
            keyHash,
            subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );

        requestIds[requestId] = lotteryId;
    }

    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal override {
        uint256 _lotteryId = requestIds[requestId];
        uint256 winnerIndex = randomWords[0] % players.length;
        address winner = players[winnerIndex];

        winners[_lotteryId] = winner;
        payable(winner).transfer(address(this).balance);

        emit WinnerSelected(_lotteryId, winner);
        delete players;
    }
}