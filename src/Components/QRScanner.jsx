import React, { useEffect, useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Box, Button, Typography } from "@mui/material";
import { api } from "../Service/api";
import { Close, Pause } from "@mui/icons-material";

const QrScanner = ({ closeScanner }) => {
    const [scanResult, setScanResult] = useState(null);
    const [result, setResult] = useState([]);
    const [isScanning, setIsScanning] = useState(false);
    const readerRef = useRef(null);
    const scannerRef = useRef(null);
    const hasResultRef = useRef(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const startScanner = async () => {
        if (isScanning) return;

        readerRef.current.innerHTML = "";
        setScanResult(null);
        hasResultRef.current = false;
        setIsScanning(true);

        const scanner = new Html5Qrcode(readerRef.current.id);
        scannerRef.current = scanner;

        try {
            await scanner.start(
                { facingMode: "environment" },
                { fps: 20, qrbox: 250 },
                async decoded => {
                    if (hasResultRef.current) return;
                    hasResultRef.current = true;

                    try {
                        const response = await api.get("/api/subscription/" + decoded);
                        setScanResult(response.data);
                        setResult(response.data)
                        if (response.status == 200) {
                            setError(false)
                        }
                    } catch (error) {
                        setError(true)
                        setErrorMessage("Error alconsultar la informacion, vuelve a intentarlo o verifica que el usuariosi tenga una subscripcion.")
                        pauseScanner();
                    }
                    pauseScanner();
                },
                () => { }
            );
        } catch (err) {
            setErrorMessage("Error al iniciar escaneo:", err);
            setIsScanning(false);
        }
    };

    const pauseScanner = async () => {
        if (!isScanning || !scannerRef.current) return;
        setIsScanning(false);

        try {
            await scannerRef.current.stop();
        } catch (_) { }
        try {
            await scannerRef.current.clear();
        } catch (_) { }

        const video = readerRef.current.querySelector("video");
        if (video && video.srcObject) {
            video.srcObject.getTracks().forEach(t => t.stop());
        }
        readerRef.current.innerHTML = "";
    };

    useEffect(() => {
        startScanner();
        return () => {
            pauseScanner();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box sx={{ width: "100%", }}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box>
                    {!scanResult && (
                        <Box
                            id="reader"
                            ref={readerRef}
                            sx={{ width: 400, height: 400, margin: "0 auto" }}
                        />
                    )}
                </Box>

                {scanResult && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%"
                        }}
                    >
                        <Box
                            sx={{
                                width: 350,
                                bgcolor: "background.paper",
                                borderRadius: 2,
                                boxShadow: 2,
                                p: 2,
                                textAlign: "center",
                                mr:"20px"
                            }}
                        >
                            <Typography variant="h6" gutterBottom color="text.secondary">
                                ✅ Información de la Membresía
                            </Typography>

                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: "bold", mt: 2 }}
                            >
                                Nombre completo
                            </Typography>
                            <Typography variant="body1">{scanResult.username}</Typography>

                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: "bold", mt: 2 }}
                            >
                                Tipo de Membresía
                            </Typography>
                            <Typography variant="body1">{scanResult.membershipName}</Typography>

                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: "bold", mt: 2 }}
                            >
                                Cédula
                            </Typography>
                            <Typography variant="body1">{scanResult.dni}</Typography>

                            <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: "bold", mt: 2 }}
                            >
                                Estado de Subscripción
                            </Typography>
                            <Typography
                                variant="body1"
                                color={scanResult.membershipStatus ? "green" : "error"}
                                sx={{ fontWeight: "bold" }}
                            >
                                {scanResult.membershipStatus ? "Activa" : "Inactiva"}
                            </Typography>
                        </Box>
                    </Box>
                )}

                <Box>
                    {!scanResult && isScanning && (
                        <Button variant="outlined" sx={{ borderColor: "blue", color: "blue" }} onClick={pauseScanner}>Pausar </Button>

                    )}
                    {!scanResult && !isScanning && (

                        <Button variant="outlined" sx={{ borderColor: "blue", color: "blue" }} onClick={startScanner}>Reanudar </Button>
                    )}
                    <Button variant="outlined" sx={{ borderColor: "text.secondary", color: "text.secondary" }} onClick={closeScanner}>Cerrar<Close /> </Button>
                </Box>


                {error && (<>
                    <Typography> {errorMessage}</Typography>
                </>)}
            </Box>
        </Box>
    );
};

export default QrScanner;
