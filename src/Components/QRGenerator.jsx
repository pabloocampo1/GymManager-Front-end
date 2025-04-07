import React, { useRef, useState } from 'react';
import QRCode from 'react-qr-code';

function QRGenerator() {
  const [value, setValue] = useState('https://ejemplo.com');
  const qrRef = useRef(null);

  const handleDownload = () => {
    const svg = qrRef.current.querySelector('svg');
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngFile;
      downloadLink.download = 'codigo-qr.png';
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgStr)));
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ingresa un valor"
      />
      <div ref={qrRef}>
        <QRCode value={value} size={200} />
      </div>
      <button onClick={handleDownload}>Descargar QR</button>
    </div>
  );
}

export default QRGenerator;
