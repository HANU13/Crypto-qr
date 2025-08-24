import { useEffect, useState } from "react";
import QRCode from "qrcode.react";

const API_BASE = "https://hanu-crypto-qr-demo.onrender.com";

export default function App() {
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
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-10">
      <h1 className="text-4xl font-bold mb-10">Hanu Crypto QR Demo</h1>

      {/* Ethereum Wallet */}
      <div className="bg-white rounded-2xl shadow-lg p-6 w-80 mb-8 text-center">
        <h2 className="text-xl font-semibold mb-4 text-indigo-600">
          Ethereum (Sepolia)
        </h2>
        <QRCode value={ethAddress} size={160} />
        <p className="mt-2 text-sm break-words">{ethAddress}</p>
        <p className="mt-2 font-bold">Balance: {ethBalance} ETH</p>
      </div>

      {/* Tron Wallet */}
      <div className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center">
        <h2 className="text-xl font-semibold mb-4 text-red-600">
          Tron (Shasta)
        </h2>
        <QRCode value={tronAddress} size={160} />
        <p className="mt-2 text-sm break-words">{tronAddress}</p>
        <p className="mt-2 font-bold">Balance: {tronBalance} TRX</p>
      </div>
    </div>
  );
}
