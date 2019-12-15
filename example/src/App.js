import React, { useEffect, useState } from 'react';
import Quagga from '@ericblade/quagga2';
import QrCodeReader from '@ericblade/quagga2-reader-qr';
import './App.css';
import code128test from './code128.png';
import qrcodetest from './qrcode.png';

Quagga.registerReader('qrcode', QrCodeReader);

const qconfig = {
  numOfWorkers: 0,
  inputStream: {
    size: 800,
    singleChannel: false,
  },
  decoder: {
    readers: ['code_128_reader', 'qrcode']
  },
  locate: true,
  locator: {
    patchSize: 'medium',
    halfSample: true,
  },
};

function App() {
  const [barcode, setBarcode] = useState(null);
  const [qrcode, setQrcode] = useState(null);

  useEffect(() => {
  // simultaneous decoding is BROKEN, see https://github.com/ericblade/quagga2/issues/5
    // const [bc, qr] = await Promise.all([
    //   Quagga.decodeSingle({ ...qconfig, src: code128test }),
    //   Quagga.decodeSingle({ ...qconfig, src: qrcodetest }),
    // ]);
    async function decode() {
      const bc = await Quagga.decodeSingle({ ...qconfig, src: code128test });
      const qr = await Quagga.decodeSingle({ ...qconfig, src: qrcodetest });
      setBarcode(bc.codeResult.code);
      setQrcode(qr.codeResult.code);
    }
    decode();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={code128test} />
        <div className="barcode-result">{barcode}</div>
        <img src={qrcodetest} />
        <div className="qrcode-result">{qrcode}</div>
      </header>
    </div>
  );
}

export default App;
