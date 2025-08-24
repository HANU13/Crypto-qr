import QRCode from "qrcode.react";

export default function App() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-10">
      <h1 className="text-4xl font-bold mb-10">Hanu Crypto QR Demo</h1>

      {/* Ethereum Wallet Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 w-80 mb-8 text-center">
        <h2 className="text-xl font-semibold mb-4 text-indigo-600">
          Ethereum (Sepolia)
        </h2>
        <QRCode value="0x1111111111111111111111111111111111111111" size={160} />
        <p className="mt-2 text-sm break-words">
          0x1111111111111111111111111111111111111111
        </p>
        <p className="mt-2 font-bold">Balance: 0.123 ETH</p>
        <button className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-xl">
          Copy Address
        </button>
      </div>

      {/* Tron Wallet Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center">
        <h2 className="text-xl font-semibold mb-4 text-red-600">
          Tron (Shasta)
        </h2>
        <QRCode value="TXY1111111111111111111111111111111111" size={160} />
        <p className="mt-2 text-sm break-words">
          TXY1111111111111111111111111111111111
        </p>
        <p className="mt-2 font-bold">Balance: 50.00 TRX</p>
        <button className="mt-3 px-4 py-2 bg-red-600 text-white rounded-xl">
          Copy Address
        </button>
      </div>
    </div>
  );
}
