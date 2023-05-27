import { useEffect, useState } from "react";
import Altar from "../../artifacts/contracts/Altar.sol/Altar.json";
import AuctionHouse from "../../artifacts/contracts/AuctionHouse.sol/AuctionHouse.json";
import ERC20 from "../../artifacts/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json";
import { ethers } from "ethers";

const useTransactions = ({ addresses }) => {
  const [recipient, setRecipients] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [txType, setTxType] = useState("");
  const [refetchCounter, setRefetchCounter] = useState(0);

  useEffect(() => {
    async function isConnected() {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setDefaultAccount(accounts[0]);
      } else {
        console.log("Metamask is not connected");
      }
    }

    isConnected();
  }, []);

  useEffect(() => {
    const main = async () => {
      if (recipient) {
        await recipient.wait();
        setRecipients(null);
        setTxType("");
      }
    };

    main();
  }, [recipient]);

  const connect = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .catch((err) => {
          if (err.code === 4001) {
            console.log("Please connect to MetaMask.");
          } else {
            console.error(err);
          }
        });
      setDefaultAccount(accounts[0]);
    } else {
      console.log("Failed");
    }
  };

  const poke = async () => {
    try {
      if (!defaultAccount) {
        await connect();
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const altar = new ethers.Contract(addresses.altar, Altar.abi, signer);
      const recipient = await altar.poke();

      setRecipients(recipient);
      setTxType("Poking");
    } catch (err) {
      console.log(err);
    }
  };

  const neededApproval = async (bidAmount) => {
    try {
      if (!defaultAccount) {
        await connect();
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const flx = new ethers.Contract(addresses.flx, ERC20.abi, signer);
      const userAllowance = await flx.allowance(
        defaultAccount,
        addresses.auctionHouse
      );

      const auctionHouse = new ethers.Contract(
        addresses.auctionHouse,
        AuctionHouse.abi,
        signer
      );
      const userBalance = await auctionHouse.bidTokenBalances(defaultAccount);

      return bidAmount.sub(userAllowance).sub(userBalance);
    } catch (err) {
      console.log(err);
    }
  };

  const increaseAllowance = async (amount) => {
    try {
      if (!defaultAccount) {
        await connect();
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const flx = new ethers.Contract(addresses.flx, ERC20.abi, signer);
      const recipient = await flx.approve(addresses.auctionHouse, amount);

      setRecipients(recipient);
      setTxType("Approving");
    } catch (err) {
      console.log(err);
    }
  };

  const bid = async (id, bidAmount) => {
    try {
      if (!defaultAccount) {
        await connect();
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const auctionHouse = new ethers.Contract(
        addresses.auctionHouse,
        AuctionHouse.abi,
        signer
      );

      const recipient = await auctionHouse.increaseBidSize(id, bidAmount);

      setRecipients(recipient);
      setTxType("Bidding");
    } catch (err) {
      console.log(err);
    }
  };

  const settle = async () => {};

  const restart = async () => {};

  return {
    connect,
    poke,
    bid,
    settle,
    restart,
    defaultAccount,
    recipient,
    neededApproval,
    increaseAllowance,
    txType,
  };
};

export default useTransactions;
