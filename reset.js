const Web3 = require('web3');
const { abi } = require('./compile');

/*
   -- Define Provider & Variables --
*/
// Provider
const providerRPC = {
   development: 'http://localhost:8545',
   moonbase: 'https://rpc.testnet.moonbeam.network',
};
const web3 = new Web3(providerRPC.development); //Change to correct network

// Variables
const account_from = {
   privateKey: '0x4201fc7d0397cf548889972472e2ea6ccc43c1fa06d7c5006e7e24e7293e2420',
};
const contractAddress = '0x03D00a10e8af03B2fD848555D83F35266081A03D';

/*
   -- Send Function --
*/
// Create Contract Instance
const incrementer = new web3.eth.Contract(abi, contractAddress);

// Build Reset Tx
const resetTx = incrementer.methods.reset();

const reset = async () => {
   console.log(
      `Calling the reset function in contract at address: ${contractAddress}`
   );

   // Sign Tx with PK
   const createTransaction = await web3.eth.accounts.signTransaction(
      {
         to: contractAddress,
         data: resetTx.encodeABI(),
         gas: await resetTx.estimateGas(),
      },
      account_from.privateKey
   );

   // Send Tx and Wait for Receipt
   const createReceipt = await web3.eth.sendSignedTransaction(
      createTransaction.rawTransaction
   );
   console.log(`Tx successful with hash: ${createReceipt.transactionHash}`);
};

reset();