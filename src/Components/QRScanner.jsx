import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QRScanner = ({ onScan }) => {
  const scannerRef = useRef(null);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    if (!isScanning) return;

    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 800,
    });

    scanner.render(
      (decodedText) => {
        console.log("QR Detectado:", decodedText);
        onScan(decodedText);
        setIsScanning(false);

        scanner.clear().catch((err) => {
          console.error("Error al limpiar el escáner:", err);
        });
      },
      
    );

    scannerRef.current = scanner;

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch((err) => console.error("Error al limpiar el escáner", err));
      }
    };
  }, [onScan, isScanning]);

  return <div id="reader" />;
};

export default QRScanner;
