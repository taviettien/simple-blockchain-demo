"use strict"

const BlockChain = require('./models/blockchain.js');

let ledger = new BlockChain();

console.log(JSON.stringify(ledger))