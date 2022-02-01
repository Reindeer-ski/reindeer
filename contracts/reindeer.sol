// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import '@openzeppelin/contracts/access/Ownable.sol';

contract Reindeer is Ownable {
	event SendNotification(
		address sender,
		address receiver,
		string topic,
		string title,
		string desciption,
		string url
	);
	event SendToTopic(
		address sender,
		string topic,
		string title,
		string desciption,
		string url
	);
	event Fund(address sender, uint256 amount);

	function sendNotification(
		address receiver,
		string calldata topic,
		string calldata title,
		string calldata desciption,
		string calldata url
	) public {
		emit SendNotification(msg.sender, receiver, topic, title, desciption, url);
	}

	function sendToTopic(
		string calldata topic,
		string calldata title,
		string calldata desciption,
		string calldata url
	) public {
		emit SendToTopic(msg.sender, topic, title, desciption, url);
	}

	function fund(address sender) public payable {
		emit Fund(sender, msg.value);
	}

	function withdrawFunds(address payable account) public onlyOwner {
		account.transfer(address(this).balance);
	}
}
