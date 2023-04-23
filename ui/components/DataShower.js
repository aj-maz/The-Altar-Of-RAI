import { ethers } from "ethers";
import moment from "moment";

const ContractLink = ({ address }) => (
  <a
    style={{ color: "red" }}
    target="_blank"
    href={`https://goerli.etherscan.io/address/${address}`}
  >
    {address}
  </a>
);

const parseDate = (dateNumber) => {
  return new Date(parseInt(String(dateNumber) * 1000));
};

const DataShower = ({ data, loading, addresses }) => {
  //console.log(data.streamData);
  return (
    <div>
      <div className="info-section">
        <h4>Addresses: </h4>
        <div style={{ marginBottom: "0.5em" }}>
          Treasury Address: <ContractLink address={addresses.treasury} />
        </div>
        <div style={{ marginBottom: "0.5em" }}>
          Altar Address: <ContractLink address={addresses.altar} />
        </div>
        <div style={{ marginBottom: "0.5em" }}>
          LIT Address: <ContractLink address={addresses.lit} />
        </div>
        <div style={{ marginBottom: "0.5em" }}>
          FLX Address: <ContractLink address={addresses.flx} />
        </div>
      </div>
      <div className="info-section">
        <h4>Stream Data: </h4>
        <div style={{ marginBottom: "0.5em" }}>
          Stream Id: {String(data.streamId)}
        </div>
        {data.streamData ? (
          <>
            <div style={{ marginBottom: "0.5em" }}>
              Stream Deposit:{" "}
              {String(ethers.utils.formatEther(data.streamData.deposit))}
            </div>
            <div style={{ marginBottom: "0.5em" }}>
              Stream Rate Per Second:{" "}
              {String(ethers.utils.formatEther(data.streamData.ratePerSecond))}
            </div>
            <div style={{ marginBottom: "0.5em" }}>
              Stream Remaining Balance:{" "}
              {String(
                ethers.utils.formatEther(data.streamData.remainingBalance)
              )}
            </div>
            <div style={{ marginBottom: "0.5em" }}>
              Stream Start Time:{" "}
              {moment(parseDate(data.streamData.startTime)).format(
                "YYYY-MM-DD  hh:mm"
              )}
            </div>
            <div style={{ marginBottom: "0.5em" }}>
              Stream End Time:{" "}
              {moment(parseDate(data.streamData.stopTime)).format(
                "YYYY-MM-DD  hh:mm"
              )}
            </div>
          </>
        ) : (
          <div style={{ marginBottom: "0.5em" }}>Stream is finished.</div>
        )}
      </div>

      <div className="info-section">
        <h4>Balances: </h4>
        <div style={{ marginBottom: "0.5em" }}>
          Altar Lit Balance:{" "}
          {String(ethers.utils.formatEther(data.altarLitBalance))}
        </div>
        <div style={{ marginBottom: "0.5em" }}>
          Altar Flx Locket:{" "}
          {String(ethers.utils.formatEther(data.altarFlxBalance))}
        </div>
      </div>
      <div className="info-section">
        <h4>
          Poke is available at:{" "}
          {moment().isAfter(moment(data.nextPokeTime))
            ? "Now"
            : moment(data.nextPokeTime).format("YYYY-MM-DD hh:mm")}
        </h4>
      </div>
    </div>
  );
};

export default DataShower;
