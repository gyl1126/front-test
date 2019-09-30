//
//  web3.js
//  Split
//
//  Created by Mumakil on 2019. 2. 7..
//  Copyright © 2019년 Melephant. All rights reserved.
//
import Web3 from 'etc/web3';

// 0.2 버전이라면 Web3.eth.contract
// 1.0 버전이라면 Web3.eth.Contract
const Contract = new Web3.eth.Contract(
	[
		{
			"constant": false,
			"inputs": [
				{
					"name": "_address",
					"type": "address"
				}
			],
			"name": "setStorageContract",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [
				{
					"name": "_name",
					"type": "string"
				},
				{
					"name": "_phone",
					"type": "string"
				},
				{
					"name": "_udid",
					"type": "string"
				},
				{
					"name": "_pincode",
					"type": "string"
				}
			],
			"name": "signUpUser",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"payable": true,
			"stateMutability": "payable",
			"type": "constructor"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "str",
					"type": "string"
				},
				{
					"name": "maxIndex",
					"type": "uint8"
				}
			],
			"name": "generateIndexWithString",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				}
			],
			"payable": false,
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [
				{
					"name": "_udid",
					"type": "string"
				}
			],
			"name": "signInUser",
			"outputs": [
				{
					"name": "",
					"type": "uint256"
				},
				{
					"name": "",
					"type": "address"
				},
				{
					"name": "",
					"type": "string"
				}
			],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		}
	]
, '0x7114a9fca2f46197cd1b273a1b3b8462a0c3dfb9');
// local
// logic
// 0x7114a9fca2f46197cd1b273a1b3b8462a0c3dfb9
// storage
// 0x44c87c6a4cbdec1a6f405b5be3f7cc0b2d42b82c

export default Contract;