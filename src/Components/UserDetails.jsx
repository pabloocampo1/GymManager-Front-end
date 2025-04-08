import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';


export default function UserDetails({ open, handleClose, data = {} }) {

    const InfoBox = ({ label, value }) => (
        <Box sx={{
            width: "auto",
            height: "100px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            bgcolor: "white",
            borderRadius: "15px"
        }}>
            <Typography variant="subtitle2" sx={{ opacity: 0.5, pb: "10px" }}>
                {label}
            </Typography>
            <Typography>
                {value}
            </Typography>
        </Box>
    );

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: "80%",
                    transform: 'translate(-50%, -50%)',
                    width: "600px",
                    height: '100%',
                    bgcolor: 'white',
                    borderRadius: "15px",
                    boxShadow: 24,


                }}
            >

                <Box sx={{
                    bgcolor: "#F9F9F9",
                    p: "0px 20px",
                    overflowY: "auto",     
                    maxHeight: "calc(100vh - 0px)", 
                }}>

                    <Box sx={{ paddingTop: "20px", display: "flex", justifyContent: "space-between" }}>
                        <Button
                            onClick={() => handleClose()}>
                            Volver
                        </Button>
                        <Button>
                            Editar
                        </Button>
                    </Box>
                    <Typography variant="subtitle2" sx={{ opacity: 0.5, pb: 2, pt: "20px", textAlign: "center" }}>
                        Información personal
                    </Typography>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                            gap: 2,
                            mb: 4,

                            p: "20px"
                        }}
                    >
                        <InfoBox label={"hola"} value={"hola 2"} />
                        <InfoBox label={"hola"} value={"hola 2"} />
                        <InfoBox label={"hola"} value={"hola 2"} />
                        <InfoBox label={"hola"} value={"hola 2"} />
                        <InfoBox label={"hola"} value={"hola 2"} />
                        <InfoBox label={"hola"} value={"hola 2"} />
                        <InfoBox label={"hola"} value={"hola 2"} />
                        <InfoBox label={"hola"} value={"hola 2"} />
                        <InfoBox label={"hola"} value={"hola 2"} />
                        {/* Agrega más campos aquí */}
                    </Box>

                    <Typography variant="subtitle2" sx={{ opacity: 0.5, mb: 2, textAlign: "center" }}>
                        Información de la cuenta
                    </Typography>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                            gap: 2,
                            mb: 4,

                            p: "20px"
                        }}
                    >
                        <InfoBox label={"hola"} value={"hola 2"} />
                        <InfoBox label={"hola"} value={"hola 2"} />
                        <InfoBox label={"hola"} value={"hola 2"} />
                        <InfoBox label={"hola"} value={"hola 2"} />
                        <InfoBox label={"hola"} value={"hola 2"} />
                        <InfoBox label={"hola"} value={"hola 2"} />
                        {/* Agrega más campos aquí */}
                    </Box>
                </Box>

            </Box>
        </Modal>
    );
}
