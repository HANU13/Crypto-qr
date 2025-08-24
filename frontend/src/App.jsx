import React, { useEffect, useState } from "react";
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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-indigo-600">
        Hanu Crypto QR Demo
      </h1>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Ethereum Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Ethereum (Sepolia)
          </h2>
          <QRCode value={ethAddress} size={180} />
          <p className="mt-4 text-sm text-gray-600 break-all">{ethAddress}</p>
          <p className="mt-2 font-medium text-gray-800">
            Balance:{" "}
            <span className="text-indigo-500">{ethBalance} ETH</span>
          </p>
        </div>

        {/* Tron Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Tron (Shasta)
          </h2>
          <QRCode value={tronAddress} size={180} />
          <p className="mt-4 text-sm text-gray-600 break-all">{tronAddress}</p>
          <p className="mt-2 font-medium text-gray-800">
            Balance:{" "}
            <span className="text-rose-500">{tronBalance} TRX</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
