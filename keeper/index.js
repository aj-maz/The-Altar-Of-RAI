const {
  OrderBookApi,
  OrderSigningUtils,
  SubgraphApi,
} = require("@cowprotocol/cow-sdk");
const { ethers } = require("ethers");
const Altar = require("../artifacts/contracts/Altar.sol/Altar.json");
const axios = require("axios");

const chainId = 5;
const RPC_URL =
  "https://eth-goerli.g.alchemy.com/v2/l_THcPj6shiZ-E1LyKHnHeXx75E1iXrT";
const private_key =
  "9cc7625bf3cb066cefc044ad287b0490379abeee053d4c13acc361f907d948ac";

const wallet = new ethers.Wallet(private_key);

const orderBookApi = new OrderBookApi({ chainId });
const subgraphApi = new SubgraphApi({ chainId });
const orderSigningUtils = new OrderSigningUtils();

const account = wallet.address;
const contr = "0x02abbdbaaa7b1bb64b5c878f7ac17f8dda169532";

const baseToken = "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6";
const targetToken = "0x02abbdbaaa7b1bb64b5c878f7ac17f8dda169532";

const api_url = "https://api.cow.fi/goerli";

async function placeOrder(order, api_url) {
  try {
    const { data } = await axios.post(
      `${api_url}/api/v1/orders`,
      {
        sellToken: order.sellToken,
        buyToken: order.buyToken,
        receiver: order.receiver,
        sellAmount: order.sellAmount.toString(),
        buyAmount: order.buyAmount.toString(),
        validTo: order.validTo,
        appData: order.appData,
        feeAmount: order.feeAmount.toString(),
        kind: "sell",
        partiallyFillable: order.partiallyFillable,
        signature: order.signature,
        signingScheme: "eip1271",
        from: order.from,
      },
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    );
    console.log(`API response: ${data}`);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.status);
      console.log(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else if (error.message) {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    } else {
      console.log(error);
    }
  }
}

const addresses = {
  sablier: "0xFc7E3a3073F88B0f249151192812209117C2014b",
  lit: "0x9e32c0EfF886B6Ccae99350Fd5e7002dCED55F15",
  flx: "0x91056d4a53e1faa1a84306d4deaec71085394bc8",
  settlement: "0x9008D19f58AAbD9eD0D60971565AA8510560ab41",
  treasury: "0x07621e58b00290985bd31238e2C2f335890cb4Db",
  altar: "0x22ba37dE2E05b797dB1Fc9EdD2324E88Af81fbF0",
};

const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

const altar = new ethers.Contract(addresses.altar, Altar.abi, provider);

const getTradeableOrder = async () => {
  try {
    const order = await altar.getTradeableOrder();
    if (order.sellAmount.eq(0)) return;
    const signature = altar.interface.encodeFunctionResult(
      "getTradeableOrder()",
      [Array.from(order)]
    );
    await placeOrder({ ...order, from: addresses.altar, signature }, api_url);
  } catch (err) {
    console.log(err);
  }
};

async function main() {
  setInterval(() => {
    console.log("checking for available order");
    try {
      getTradeableOrder();
    } catch (err) {
      console.log(err);
    }
  }, 15 * 1000);
}

main();
