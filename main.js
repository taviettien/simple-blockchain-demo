const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash).toString();
    }
}

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

let ledger = new BlockChain();

console.log(JSON.stringify(ledger))