// components/QRCodeGenerator.js
import { useRef, useState } from 'react';
import QRCode from 'react-qr-code';

const QRCodeGenerator = () => {
  const [link, setLink] = useState('');
  const qrRef = useRef();

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector('canvas');
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = pngUrl;
      link.download = 'qrcode.png';
      link.click();
    }
  };

  const handlePrint = () => {
    const canvas = qrRef.current.querySelector('canvas');
    if (canvas) {
      const newWindow = window.open('', '_blank');
      newWindow.document.write(`<img src="${canvas.toDataURL('image/png')}" />`);
      newWindow.print();
    }
  };

  return (
    <div>
      <h1>Gerador de QR Code</h1>
      <input
        type="text"
        placeholder="Digite o link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      {link && (
        <div ref={qrRef}>
          <QRCode value={link} />
        </div>
      )}
      <button onClick={handleDownload}>Salvar QR Code</button>
      <button onClick={handlePrint}>Imprimir QR Code</button>
    </div>
  );
};

export default QRCodeGenerator;
