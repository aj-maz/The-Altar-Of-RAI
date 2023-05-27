/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ButtonBase, Typography, Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import DataPanel from "./DataPanel";
import moment from "moment";
import { ethers } from "ethers";

const NextEventIn = ({ nextPokeTime, pokeCooldown }) => {
  const [secondDifference, setSecondDifference] = useState(
    moment(nextPokeTime).diff(new Date(), "seconds")
  );
  const daysDifference = moment(nextPokeTime).diff(new Date(), "days");

  useEffect(() => {
    let a;
    const main = () => {
      a = setInterval(() => {
        setSecondDifference(moment(nextPokeTime).diff(new Date(), "seconds"));
      }, 1000);
    };

    main();

    return () => {
      clearInterval(a);
    };
  }, []);

  const renderText = () => {
    if (nextPokeTime > new Date()) {
      return `Next event in ${daysDifference} days`;
    } else {
      return "Ready To Poke!";
    }
  };

  const progressAmount = () => {
    if (secondDifference <= 0) {
      return 0;
    }
    return Number(
      String(
        ethers.BigNumber.from(secondDifference)
          .mul(ethers.BigNumber.from(100))
          .div(pokeCooldown)
      )
    );
  };

  return (
    <div>
      <DataPanel progress={progressAmount()}>{renderText()}</DataPanel>
    </div>
  );
};
export default NextEventIn;
