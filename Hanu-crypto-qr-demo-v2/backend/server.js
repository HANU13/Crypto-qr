import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { ethers } from 'ethers';
import TronWeb from 'tronweb';

dotenv.config();
const app = express();
app.use(cors());

// Ethereum setup
const ethProvider = new ethers.JsonRpcProvider(process.env.ETH_RPC);
const ethAddress = process.env.ETH_ADDRESS;

// Tron setup
const tronWeb = new TronWeb({
  fullHost: process.env.TRON_FULLNODE
});
const tronAddress = process.env.TRON_ADDRESS;

// ETH balance
app.get('/eth/balance', async (req, res) => {
  try {
    const balance = await ethProvider.getBalance(ethAddress);
    res.json({ address: ethAddress, balance: ethers.formatEther(balance) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// TRX balance
app.get('/tron/balance', async (req, res) => {
  try {
    const balance = await tronWeb.trx.getBalance(tronAddress);
    res.json({ address: tronAddress, balance: balance / 1e6 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 5055;
app.listen(port, () => console.log(`Backend running on port ${port}`));
