import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { calculateRemainingDays } from './Modals/ControlAccessModals/DataUserAccesAllInfo';


export default function UserDetails({ open, handleClose, data = {}} ) {

    const InfoBox = ({ label, value, width = "auto"  }) => (
        <Box sx={{
            width: { width },
            height: "100px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            bgcolor: "background.paper",
            borderRadius: "15px",
             textAlign: "center",
           
    
      whiteSpace: "nowrap", 
    overflowX: "auto", 

        }}>
            <Typography variant="subtitle2" sx={{ opacity: 0.5, pb: "10px" }}>
                {label}
            </Typography>
            <Typography>
                {value}
            </Typography>
        </Box>
    );

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const calculateAge = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        // Si todavía no ha cumplido años este año, restamos 1
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age;
    };


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
                    bgcolor: 'background.paper',
                    borderRadius: "15px",
                    boxShadow: 24,


                }}
            >

                <Box sx={{
                    bgcolor: "background.default",
                    p: "0px 20px",
                    overflowY: "auto",
                    maxHeight: "calc(100vh - 0px)",
                    pb:"40px"
                }}>

                    <Box sx={{ paddingTop: "20px", display: "flex", justifyContent: "space-between" }}>
                        <Button
                            onClick={() => handleClose()}>
                            Volver
                        </Button>
                        
                    </Box>
                    <Typography variant="subtitle2" sx={{ pb: 2, pt: "20px", textAlign: "center", }}>
                        Información personal
                    </Typography>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                            gap: 2,
                            mb: 4,

                            p: "20px"
                        }}
                    >
                        <InfoBox label={"Nombre completo"} value={data.fullName} />
                        <InfoBox label={"Cedula"} value={data.dni} />
                        <InfoBox label={"Edad"} value={calculateAge(data.dateOfBirth)} />
                        <InfoBox label={"Genero"} value={data.gender} />
                        <InfoBox label={"Telefono"} value={data.phone} />
                        <InfoBox  label={"Email"} value={data.email} />
                        <InfoBox label={"Fecha de registro"} value={formatDate(data.createDate)} />
                       
                        {/* Agrega más campos aquí */}
                    </Box>

                    <Typography variant="subtitle2" sx={{  mb: 2, textAlign: "center",  }}>
                        Información de la suscripcion
                    </Typography>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                            gap: 2,
                            mb: 4,

                            p: "20px"
                        }}
                    >
                        <InfoBox label={"Tipo de membresia"} value={data.typeMembership} />
                        <InfoBox label={"Nombre de membresia"} value={data.nameMembership} />
                        <InfoBox label={"Estado de la suscripcion"} value={data.stateOfMembership ? "Activa" : "Vencida"} />
                        <InfoBox label={"Dias Restantes"} value={calculateRemainingDays(data.dateFinished)} />
                        <InfoBox label={"Inicio de suscripcion"} value={formatDate(data.dateStart)} />
                        <InfoBox label={"Fin de suscripcion"} value={formatDate(data.dateFinished)} />
                        {/* Agrega más campos aquí */}
                    </Box>
                </Box>

            </Box>
        </Modal>
    );
}
