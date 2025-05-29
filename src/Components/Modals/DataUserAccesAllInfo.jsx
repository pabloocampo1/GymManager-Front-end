import React, { useEffect, useState } from 'react';
import { Box, Typography, Modal, Button, TextField, Autocomplete, Stack } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import ButtonActive from '../Buttons/ButtonActive';
import ButtonInactive from '../Buttons/ButtonInactive';
import { api } from '../../Service/api';
import PaymentComponent from '../PaymentComponent/PaymentComponent';

export default function DataUserAccesAllInfo({ open, onClose, userId, message,  }) {
    const [isUpdateMembership, setIsUpdateMembership] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [dataUser, setDataUser] = useState([])



    const InfoBox = ({ label, value }) => (
        <Box sx={{
            width: "160px",
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const calculateRemainingDays = (finishDateStr) => {
        const today = new Date();
        const finishDate = new Date(finishDateStr);
        const diff = finishDate.getTime() - today.getTime();
        const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
        return daysLeft > 0 ? daysLeft : 0;
    };

    const accessLog = async (data) => {
        try{
            const response = await api.get(`/api/accessLog/save/${data.id}`)
            if (!response.data){
                alert("Algo en el sistema no responde.")
                return;
            }
            onClose();
            
        }catch(Error){
            console.error(Error);
            
        }
    }



    useEffect(() => {
        const fetchDataUser = async () => {
            try {
                const response = await api.get(`/api/members/getFullData/${userId}`);
                setDataUser(response.data)
 
            } catch (error) {
                console.error(error);
            }
        }

        fetchDataUser()

    }, [isUpdateMembership])

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
                        width:"80vw",
                        maxWidth: "70vw",
                        bgcolor: "#F9F9F9",
                        maxHeight: "95vh",
                        overflowY: "auto",
                        overflowX: "hidden",
                        boxShadow: 24,
                        p: 3,
                        borderRadius: "15px",
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <Box sx={{
                        display: "flex",
                        width:"100%",
                        flexDirection:"column",
                        alignItems: "center",
                        justifyContent:"center",
                       
                    }}>
                        <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", mb: 2 }}>
                            <Typography variant="h6">Información del usuario - Membresía</Typography>
                           
                        </Box>

                        <Box sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "16px",
                            mb: 4
                        }}>
                            <InfoBox label="Nombre" value={dataUser.fullName} />
                            <InfoBox label="Identificación" value={dataUser.dni} />
                            <InfoBox label="Nombre de Membresía" value={dataUser.nameMembership} />
                            <InfoBox
                                label="Estado de Membresía"
                                value={dataUser.stateOfMembership
                                    ? <ButtonActive text="Activa" />
                                    : <ButtonInactive text="Vencida" />
                                }
                            />
                            <InfoBox label="Inicio de Membresía" value={formatDate(dataUser.dateStart)} />
                            <InfoBox label="Fin de Membresía" value={formatDate(dataUser.dateFinished)} />
                            <InfoBox label="Días Restantes" value={calculateRemainingDays(dataUser.dateFinished)} />
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                            {!dataUser.stateOfMembership && (
                                <Button variant="text" onClick={() => setOpenUpdate(true)}>
                                    Restaurar Membresía
                                </Button>
                            )}
                            {dataUser.stateOfMembership && (
                                <Button variant="outlined" onClick={() => { message(); accessLog(dataUser) }}>
                                    Registrar Entrada
                                </Button>
                            )}
                        </Box>
                    </Box>

                    {openUpdate && (<PaymentComponent userInfo={dataUser} isUpdateMembership={() => setIsUpdateMembership(true)} closeUpdateSubscription={() => {setIsUpdateMembership(true) ,setOpenUpdate(false)}} />)}
                    <CloseOutlined onClick={onClose} sx={{ cursor: 'pointer', position:"absolute", top:"2%", right:"2%" }} />
                </Box>
            </Modal >
        </Box >
    );
}
