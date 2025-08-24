import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import QRCode from "qrcode.react";

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
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Hanu Crypto QR Demo</h1>

      <h2>Ethereum (Sepolia)</h2>
      <QRCode value={ethAddress} size={200} />
      <p>{ethAddress}</p>
      <p><b>Balance:</b> {ethBalance}</p>

      <h2>Tron (Shasta)</h2>
      <QRCode value={tronAddress} size={200} />
      <p>{tronAddress}</p>
      <p><b>Balance:</b> {tronBalance}</p>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
