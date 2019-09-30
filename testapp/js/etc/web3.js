//
//  web3.js
//  Split
//
//  Created by Mumakil on 2019. 2. 7..
//  Copyright © 2019년 Melephant. All rights reserved.
//
import Web3 from 'web3';

// const web3 = new Web3(new Web3.providers.HttpProvider('http://192.168.0.156:8545')); // local melephant
const web3 = new Web3(new Web3.providers.HttpProvider('http://172.17.8.199:8545'));     // local PUBLIC WIFI LH HUB

export default web3;