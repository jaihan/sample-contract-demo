const Web3 = require('web3');
const contractFile = require('./compile');

/*
   -- Define Provider & Variables --
*/
// Provider
const providerRPC = {
   development: 'http://localhost:8545',
   socket: 'https://besu2.sdax.co:443 ',
};
const web3 = new Web3(providerRPC.socket); //Change to correct network


// Variables
const account_from = {
   privateKey: '0xfc8bb3276f71a5f19762be678edfa07bce65140e4a15f538663f4986ca1dad23',
   address: '0x30da64ad39bE4138Dae9dABdB5bfF5Ae3391FD31',
};
const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;

/*
   -- Deploy Contract --
*/
const deploy = async () => {
   console.log(`Attempting to deploy from account ${account_from.address}`);

   // Create Contract Instance
   const incrementer = new web3.eth.Contract(abi);

   console.log(`incrementer ${incrementer}`);

   // Create Constructor Tx
   const incrementerTx = incrementer.deploy({
      data: bytecode,
      arguments: [2],
   });

   console.log(`incrementerTx ${incrementerTx}`);

   // Sign Transacation and Send
   const createTransaction = await web3.eth.accounts.signTransaction(
      {
         data: incrementerTx.encodeABI(),
         gas: await incrementerTx.estimateGas(),
      },
      account_from.privateKey
   );

   // // Send Tx and Wait for Receipt
   const createReceipt = await web3.eth.sendSignedTransaction(
      createTransaction.rawTransaction
   );
   console.log(
      `Contract deployed at address: ${createReceipt.contractAddress}`
   );
};

deploy();