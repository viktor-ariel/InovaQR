// components/QRCodeGenerator.js
import { useRef, useState } from 'react';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';

const QRCodeGenerator = () => {
  const [link, setLink] = useState('');
  const qrRef = useRef();

  const handleDownload = () => {
    if (qrRef.current) {
      html2canvas(qrRef.current, { scale: 2 }).then((canvas) => {
        const pngUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = pngUrl;
        link.download = 'qrcode.png';
        link.click();
      });
    }
  };

  const handlePrint = () => {
    if (qrRef.current) {
      html2canvas(qrRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const newWindow = window.open('', '_blank');

        if (newWindow) {
          newWindow.document.write(`
            <html>
              <head>
                <title>Imprimir QR Code</title>
                <style>
                  @page {
                    size: A4;
                    margin: 0;
                  }
                  body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                  }
                  img {
                    max-width: 100%;
                    max-height: 100%;
                    margin: auto;
                  }
                </style>
              </head>
              <body>
                <img src="${imgData}" />
              </body>
            </html>
          `);
          newWindow.document.close();
          newWindow.onload = () => {
            newWindow.print();
            newWindow.close();
          };
        } else {
          alert('Não foi possível abrir a nova janela. Verifique as configurações do seu navegador.');
        }
      });
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Gerador de QR Code</h1>
      <input
        type="text"
        placeholder="Digite o link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        style={{ width: '300px', marginBottom: '20px' }}
      />
      {link && (
        <div ref={qrRef} style={{ margin: '20px auto' }}>
          <QRCode value={link} size={256} />
        </div>
      )}
      <button onClick={handleDownload}>Salvar QR Code</button>
      <button onClick={handlePrint}>Imprimir QR Code</button>
    </div>
  );
};

export default QRCodeGenerator;
