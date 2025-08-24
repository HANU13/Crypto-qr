import React from 'react';
import ReactDOM from 'react-dom/client';
import QRCode from 'qrcode.react';

const App = () => {
  const ethAddress = "0x1111111111111111111111111111111111111111";
  const tronAddress = "TXY11111111111111111111111111111111";

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h1>Hanu Crypto QR Demo</h1>
      <h2>Ethereum (Sepolia)</h2>
      <QRCode value={ethAddress} size={200} />
      <p>{ethAddress}</p>

      <h2>Tron (Shasta)</h2>
      <QRCode value={tronAddress} size={200} />
      <p>{tronAddress}</p>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
