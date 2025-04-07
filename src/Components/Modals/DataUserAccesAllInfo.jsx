import React, { useEffect, useState } from 'react';
import { Box, Typography, Modal, Button, TextField, Autocomplete, Stack } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import ButtonActive from '../Buttons/ButtonActive';
import ButtonInactive from '../Buttons/ButtonInactive';

export default function DataUserAccesAllInfo({ open, onClose, data = {}, message }) {
    const [isUpdateMembership, setIsUpdateMembership] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const mem = [
        {
            "title": "Tipo Membresia 1",
        },
        {
            "title": "Tipo Membresia 2",
        },
        {
            "title": "Tipo Membresia 3",
        },
    ]
    const defaultProps = {
        options: mem,
        getOptionLabel: (option) => option.title,
    };

    const [optionMembership, setOptionMembership] = useState(null);

    const InfoBox = ({ label, value }) => (
        <Box sx={{
            width: "200px",
            height: "100px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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


    useEffect(() => {
console.log("se actualizo");

    }, [isUpdateMembership] )

    return (
        <Box>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        minWidth: "900px",
                        bgcolor: "#F9F9F9",
                        boxShadow: 24,
                        p: 3,
                        borderRadius: "15px",
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"center"
                    }}
                >
                    <Box sx={{width:"100%", display: "flex", justifyContent: "space-between", mb: 2 }}>
                        <Typography variant="h6">Información del usuario - Membresía</Typography>
                        <CloseOutlined onClick={onClose} sx={{ cursor: 'pointer' }} />
                    </Box>

                    <Box sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "16px",
                        mb: 4
                    }}>
                        <InfoBox label="Nombre" value={data.name} />
                        <InfoBox label="Identificación" value={data.DNI} />
                        <InfoBox label="Tipo de Membresía" value={data.tipoMembresia} />
                        <InfoBox
                            label="Estado de Membresía"
                            value={data.estado === "Activa"
                                ? <ButtonActive text={data.estado} />
                                : <ButtonInactive text={data.estado} />
                            }
                        />
                        <InfoBox label="Inicio de Membresía" value={data.inicio} />
                        <InfoBox label="Fin de Membresía" value={data.fin} />
                        <InfoBox label="Días Restantes" value={data.diasRestantes} />
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                        {data.estado !== "Activa" && (
                            <Button variant="text" onClick={() => setOpenUpdate(true)}>
                                Restaurar Membresía
                            </Button>
                        )}
                        {data.estado === "Activa" && (
                            <Button variant="outlined" onClick={() => { message(); onClose(); }}>
                                Registrar Entrada
                            </Button>
                        )}
                    </Box>

                    {openUpdate && (
                        <Box sx={{
                            mt: 6,
                            width: "50%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: "white",
                            borderRadius: "10px",
                            p: 3
                        }}>
                            <Box>
                                <Stack spacing={1} sx={{ width: 300 }}>

                                    <Autocomplete
                                        {...defaultProps}
                                        id="controlled-demo"
                                        value={optionMembership}
                                        onChange={(event, newValue) => {
                                            setOptionMembership(newValue);
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Tipo De Membresia" variant="standard" />
                                        )}
                                    />

                                </Stack>
                            </Box>

                            <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                                <Button variant="outlined" onClick={() => setOpenUpdate(false)}>Cancelar</Button>
                                <Button variant="contained" color="success" onClick={() => {
                                    setIsUpdateMembership(true);
                                    setOptionMembership(null)
                                    setOpenUpdate(false)
                                }}>Confirmar</Button>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Modal>
        </Box>
    );
}
