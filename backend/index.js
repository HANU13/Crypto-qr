import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// Mock demo balances (replace with real RPC/web3 logic later)
app.get("/eth/balance", (req, res) => {
  res.json({ balance: "0.123 ETH" });
});

app.get("/tron/balance", (req, res) => {
  res.json({ balance: "50.00 TRX" });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
