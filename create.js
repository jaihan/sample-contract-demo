const Web3 = require('web3');
const web3 = new Web3('https://besu.sdax.co:443');

const create = async() => {
const myNewAcount = await web3.eth.accounts.create();
console.log(myNewAcount);
}

create();