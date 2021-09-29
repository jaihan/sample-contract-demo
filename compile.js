const fs = require('fs');
const solc = require('solc');
const path = require('path');

// Get Path and Load Contract
const inboxPath = path.resolve(__dirname, 'Incrementer.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

// Compile Contract
var input = {
   language: 'Solidity',
   sources: {
      'Incrementer.sol': {
         content: source,
      },
   },
   settings: {
      outputSelection: {
         '*': {
            '*': ['*'],
         },
      },
   },
};
const tempFile = JSON.parse(solc.compile(JSON.stringify(input)));
const contractFile = tempFile.contracts['Incrementer.sol']['Incrementer'];

console.log(`compile OK`);

// Export Contract Data
module.exports = contractFile;