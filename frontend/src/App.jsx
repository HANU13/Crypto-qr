import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import {
  WagmiConfig,
  createConfig,
  http,
  useAccount,
  useConnect,
  useDisconnect,
  useBalance,
  useSendTransaction,
} from "wagmi";
import { sepolia } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { parseEther } from "viem";

const API_BASE = "https://hanu-crypto-qr-demo.onrender.com";

// --- Wagmi config (Ethereum) ---
const config = createConfig({
  autoConnect: true,
  connectors: [new InjectedConnector({ chains: [sepolia] })],
  publicClient: http(),
});

// --- Ethereum Wallet Section ---
function EthWallet({ setEthAddress }) {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({ connector: new InjectedConnector() });
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (isConnected && address) setEthAddress(address);
  }, [isConnected, address, setEthAddress]);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
      <h2 className="text-xl font-semibold text-indigo-600 mb-4">
        Ethereum (Sepolia)
      </h2>
      {isConnected ? (
        <>
          <p className="text-sm break-all mb-2">Connected: {address}</p>
          <button
            onClick={() => disconnect()}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Disconnect
          </button>
        </>
      ) : (
        <button
          onClick={() => connect()}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}

// --- Ethereum Transaction + Dashboard ---
function EthDashboard({ address }) {
  const { data: balance } = useBalance({ address, chainId: sepolia.id });
  const { sendTransaction } = useSendTransaction();
  const [txs, setTxs] = useState([]);

  const sendTestEth = async () => {
    try {
      await sendTransaction({
        to: "0x1111111111111111111111111111111111111111", // 🔑 replace with receiver wallet
        value: parseEther("0.01"),
      });
      alert("Transaction sent!");
    } catch (err) {
      console.error(err);
      alert("Transaction failed!");
    }
  };

  useEffect(() => {
    if (!address) return;
    const API_KEY = "YourEtherscanApiKey"; // 🔑 replace with your Etherscan key
    fetch(
      `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.result) setTxs(data.result.slice(0, 5));
      });
  }, [address]);

  if (!address) return null;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center mt-4">
      <p className="mb-2">
        Balance:{" "}
        <span className="font-bold text-indigo-500">
          {balance ? balance.formatted : "Loading..."} {balance ? balance.symbol : ""}
        </span>
      </p>
      <button
        onClick={sendTestEth}
        className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg"
      >
        Send 0.01 ETH
      </button>
      <h3 className="mt-4 font-semibold">Recent Transactions</h3>
      <ul className="text-sm space-y-1 mt-2">
        {txs.map((tx) => (
          <li key={tx.hash}>
            <a
              href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 underline"
            >
              {tx.hash.substring(0, 12)}...
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- Tron Wallet Section ---
function TronWallet({ tronAddress, setTronAddress, tronBalance, setTronBalance }) {
  const connectTron = async () => {
    if (window.tronWeb && window.tronWeb.ready) {
      const addr = window.tronWeb.defaultAddress.base58;
      setTronAddress(addr);

      const bal = await window.tronWeb.trx.getBalance(addr);
      setTronBalance(bal / 1e6);
    } else {
      alert("Please install TronLink and switch to Shasta testnet!");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
      <h2 className="text-xl font-semibold text-red-600 mb-4">Tron (Shasta)</h2>
      {tronAddress ? (
        <>
          <p className="text-sm break-all mb-2">Connected: {tronAddress}</p>
          <p className="font-bold text-red-500">{tronBalance} TRX</p>
        </>
      ) : (
        <button
          onClick={connectTron}
          className="px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Connect TronLink
        </button>
      )}
    </div>
  );
}

// --- Main App ---
const App = () => {
  const ethAddress = "0x1111111111111111111111111111111111111111";
  const tronAddressStatic = "TXY11111111111111111111111111111111";

  const [ethBalance, setEthBalance] = useState("Loading...");
  const [tronBalanceApi, setTronBalanceApi] = useState("Loading...");

  const [ethConnected, setEthConnected] = useState(null);
  const [tronAddress, setTronAddress] = useState(null);
  const [tronBalance, setTronBalance] = useState(null);

  // --- fetch balances from backend API (your original setup) ---
  useEffect(() => {
    fetch(`${API_BASE}/eth/balance`)
      .then((res) => res.json())
      .then((data) => setEthBalance(data.balance))
      .catch(() => setEthBalance("Error"));

    fetch(`${API_BASE}/tron/balance`)
      .then((res) => res.json())
      .then((data) => setTronBalanceApi(data.balance))
      .catch(() => setTronBalanceApi("Error"));
  }, []);

  return (
    <WagmiConfig config={config}>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 space-y-8">
        <h1 className="text-3xl font-bold text-indigo-600">Hanu Crypto QR Demo</h1>

        {/* QR Cards (original) */}
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Ethereum (Sepolia)
            </h2>
            <QRCode value={ethAddress} size={180} />
            <p className="mt-4 text-sm text-gray-600 break-all">{ethAddress}</p>
            <p className="mt-2 font-medium text-gray-800">
              API Balance: <span className="text-indigo-500">{ethBalance} ETH</span>
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Tron (Shasta)
            </h2>
            <QRCode value={tronAddressStatic} size={180} />
            <p className="mt-4 text-sm text-gray-600 break-all">{tronAddressStatic}</p>
            <p className="mt-2 font-medium text-gray-800">
              API Balance: <span className="text-rose-500">{tronBalanceApi} TRX</span>
            </p>
          </div>
        </div>

        {/* Ethereum Interactive Wallet */}
        <EthWallet setEthAddress={setEthConnected} />
        <EthDashboard address={ethConnected} />

        {/* Tron Interactive Wallet */}
        <TronWallet
          tronAddress={tronAddress}
          setTronAddress={setTronAddress}
          tronBalance={tronBalance}
          setTronBalance={setTronBalance}
        />
      </div>
    </WagmiConfig>
  );
};

export default App;
