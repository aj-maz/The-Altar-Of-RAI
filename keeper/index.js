const {
  OrderBookApi,
  OrderSigningUtils,
  SubgraphApi,
} = require("@cowprotocol/cow-sdk");
const { ethers } = require("ethers");
const Altar = require("../artifacts/contracts/Altar.sol/Altar.json");
const axios = require("axios");

const RPC_URL =
  "https://eth-goerli.g.alchemy.com/v2/l_THcPj6shiZ-E1LyKHnHeXx75E1iXrT";

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
  flx: "0x9e32c0EfF886B6Ccae99350Fd5e7002dCED55F15",
  lit: "0x91056d4a53e1faa1a84306d4deaec71085394bc8",
  settlement: "0x9008D19f58AAbD9eD0D60971565AA8510560ab41",
  treasury: "0xa5f2a0BB8AA738980e30Ec4a37415263fC470fa7",
  altar: "0x4c94c01b2bA07bb90B39e9c39891c0456eA24c05",
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
