import { ArchwayClient } from '@archwayhq/arch3.js';
import { SigningArchwayClient } from '@archwayhq/arch3.js';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { GasPrice, calculateFee } from "@cosmjs/stargate";

const network = {
  chainId: 'constantine-3',
  endpoint: 'https://rpc.constantine.archway.tech',
  prefix: 'archway',
};

const mnemonic = 'core wear goose congress elephant afraid amazing diet holiday crush better expect provide envelope involve slide hotel prepare dad zoo fatal media cute already';
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: network.prefix });
const accounts = await wallet.getAccounts();
const client = await SigningArchwayClient.connectWithSigner(network.endpoint, wallet);

const marketContractAddress = 'archway1cwx58k4xew5zrc4zqs888w58fhckvn09ryh02qx03dv83g8d6fyq6kcl3s';
const contractAddress = 'archway15y2rtn48nm0483umghatyj48n8fs6lrwj7t5q2lpl7apzdtmx37qg6j8wc'; // collection address

let bid_amount = {
    amount: "101",
    denom: "aconst"
};

let acceptOffer = `{"accept_offer": {"key": "1695143069000"}}`;

const gasPrice = GasPrice.fromString("1000000000000aconst");
const { transactionHash } = await client.execute(
  accounts[0].address,
  contractAddress,
  {
    send_nft: {
        "contract": marketContractAddress,
        "token_id": "1",
        "msg": Buffer.from(acceptOffer).toString("base64")
    }
  },
  calculateFee(1000000, gasPrice),
  ""
);

console.log(transactionHash);