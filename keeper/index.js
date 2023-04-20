const {
  OrderBookApi,
  OrderSigningUtils,
  SubgraphApi,
} = require("@cowprotocol/cow-sdk");
const { ethers } = require("ethers");

const chainId = 5;
const RPC_URL =
  "https://eth-goerli.g.alchemy.com/v2/l_THcPj6shiZ-E1LyKHnHeXx75E1iXrT";
const private_key =
  "9cc7625bf3cb066cefc044ad287b0490379abeee053d4c13acc361f907d948ac";

const wallet = new ethers.Wallet(private_key);

const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

const orderBookApi = new OrderBookApi({ chainId });
const subgraphApi = new SubgraphApi({ chainId });
const orderSigningUtils = new OrderSigningUtils();

const account = wallet.address;
const contr = "0x02abbdbaaa7b1bb64b5c878f7ac17f8dda169532";

const baseToken = "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6";
const targetToken = "0x02abbdbaaa7b1bb64b5c878f7ac17f8dda169532";

async function main() {
  try {
    const sellAmount = "0.2".toString();
    const sellAmountParsed = ethers.utils.parseEther(sellAmount).toString();

    console.log(sellAmountParsed);

    const quoteRequest = {
      sellToken: baseToken, // WETH goerli
      buyToken: targetToken, // GNO goerli
      from: contr,
      receiver: account,
      sellAmountBeforeFee: sellAmountParsed, // 0.4 WETH
      kind: "sell",
    };

    const { quote } = await orderBookApi.getQuote(quoteRequest);

    const orderSigningResult = await OrderSigningUtils.signOrder(
      quote,
      chainId,
      wallet
    );

    const orderId = await orderBookApi.sendOrder({
      ...quote,
      ...orderSigningResult,
    });

    const order = await orderBookApi.getOrder(orderId);

    //const orderId = await orderBookApi.sendOrder({
    //  ...quote,
    //  ...orderSigningResult,
    //});

    console.log(orderId, order);

    console.log(parseInt(Number(new Date()) / 1000));
    console.log(quote);
    console.log(orderSigningResult);
  } catch (err) {
    console.log(err);
  }
}

main();
