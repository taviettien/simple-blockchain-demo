"use strict"

const Block = require('./block.js');

class BlockChain{
    constructor(){
        this.chain = [this.createFirstBlock()];
    }

    createFirstBlock(){
        return new Block(0, "01/01/2018", "First Block");
    }

    getLastBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLastBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isValid(){
        for (let i = 0; i < this.chain.length; i++){
            currentBlock = this.chain[i];
            previousBlock = this.chain[i-1];

            if (currentBlock.calculateHash != currentBlock.hash)
                return false;

            if (currentBlock.previousHash != previousBlock.hash)
                return false;
        }
        return true;
    }
}

module.exports = BlockChain;