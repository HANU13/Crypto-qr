import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import "./App.css";

const API_BASE = "https://hanu-crypto-qr-demo.onrender.com";

const App = () => {
  const ethAddress = "0x1111111111111111111111111111111111111111";
  const tronAddress = "TXY11111111111111111111111111111111";

  const [ethBalance, setEthBalance] = useState("Loading...");
  const [tronBalance, setTronBalance] = useState("Loading...");

  useEffect(() => {
    fetch(`${API_BASE}/eth/balance`)
      .then((res) => res.json())
      .then((data) => setEthBalance(data.balance))
      .catch(() => setEthBalance("Error"));

    fetch(`${API_BASE}/tron/balance`)
      .then((res) => res.json())
      .then((data) => setTronBalance(data.balance))
      .catch(() => setTronBalance("Error"));
  }, []);

  return (
    <div className="container">
      <h1 className="title">Hanu Crypto QR Demo</h1>

      <div className="card">
        <h2>Ethereum (Sepolia)</h2>
        <QRCode value={ethAddress} size={180} />
        <p className="address">{ethAddress}</p>
        <p className="balance"><b>Balance:</b> {ethBalance} ETH</p>
      </div>

      <div className="card">
        <h2>Tron (Shasta)</h2>
        <QRCode value={tronAddress} size={180} />
        <p className="address">{tronAddress}</p>
        <p className="balance"><b>Balance:</b> {tronBalance} TRX</p>
      </div>
    </div>
  );
};

export default App;
