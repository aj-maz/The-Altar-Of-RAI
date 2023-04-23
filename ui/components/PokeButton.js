import { useState } from "react";
import { ethers } from "ethers";
import moment from "moment";

import Altar from "../../artifacts/contracts/Altar.sol/Altar.json";

const PokeButton = ({ addresses, data }) => {
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const connectwalletHandler = async () => {
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
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const altar = new ethers.Contract(addresses.altar, Altar.abi, signer);
    await altar.poke();
  };

  if (!data.streamData || !moment().isAfter(moment(data.nextPokeTime))) {
    return <button disabled>Not Pokable</button>;
  }

  if (defaultAccount) {
    return <button onClick={poke}>Let's Poke</button>;
  }

  return <button onClick={connectwalletHandler}>Connect To Poke</button>;
};

export default PokeButton;
