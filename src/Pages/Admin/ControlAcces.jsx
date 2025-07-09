import {
    Box,
    Button,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchInput from '../../Components/SearchInputComponent';
import ModalVisitRegular from '../../Components/Modals/ControlAccessModals/ModalVisitRegular';
import DataUserAccesUI from '../../Components/Modals/ControlAccessModals/DataUserAccesSummaryUI';
import ShowMessageSuccess from '../../Components/ShowMessageSuccess';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import { api } from '../../Service/api';
import imageSearch from "../../assets/images/undraw_search-control_k649.svg"
import { Outlet } from 'react-router-dom';
import ActivityRegister from './Dashboard/ActivityRegister';
import { AddCard, AppRegistrationOutlined, LocalActivity } from '@mui/icons-material';
import QrScanner from '../../Components/QRScanner';

function ControlAcces() {
    const [isUserSelected, setIsUserSelected] = useState(false);
    const [open, setOpen] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [userData, setUserData] = useState('');
    const [showActivity, setShowActivity] = useState(false);
    const [showScanner, setShowScaneer] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (searchTerm != "") {
                try {
                    const response = await api.get(`/api/members/searchControlAccess/${searchTerm}`);
                    setUserData(response.data)
                } catch (error) {
                    console.error(error);

                }
            }
        }

        fetchData()
    }, [searchTerm]);

    const mostrarMensaje = () => {
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleInputSearch = (value) => {
        setSearchTerm(value);
        setShowActivity(false)
        setIsUserSelected(true);
    };

    function stopAllCameras() {
  // Recorre todos los elementos <video> en la página
  document.querySelectorAll("video").forEach((video) => {
    if (video.srcObject) {
      // Detiene cada pista del stream
      video.srcObject.getTracks().forEach((track) => track.stop());
      // Desasocia el stream del elemento
      video.srcObject = null;
    }
  });
}


    useEffect(() => {
        setIsUserSelected(false);
    }, []);

    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '100vh',
                p: '20px 100px',
                bgcolor: 'background.default',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            {open && <ModalVisitRegular open={open} handleClose={handleClose} ShowMessageSuccess={mostrarMensaje} />}

            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'start',
                    pb: '30px',
                }}
            >
                <Typography variant="h3">Control de acceso</Typography>
            </Box>

            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    pb: '20px',
                }}
            >
                <Typography variant="body1" sx={{ opacity: '0.50' }}>
                    Registrar entrada de miembros y visitas
                </Typography>
                <Box >
                    <Button
                        onClick={() => { setShowActivity(true) }}
                        variant="outlined"
                        sx={{mr:"20px", borderColor:"primary.main", color:"text.primary"}}
                    >
                        <AppRegistrationOutlined sx={{color:'text.primry'}} />
                        Ver Actividad
                    </Button>
                   <Button
                        onClick={() => { handleOpen() }}
                        variant="outlined"
                        sx={{mr:"20px", borderColor:"primary.main", color:"text.primary"}}
                    >
                        <AddCard />
                        Visita Regular
                    </Button>
                </Box>
            </Box>

            <Box
                sx={{
                    bgcolor: 'background.paper',
                    width: '100%',
                    height: '70vh',
                    borderRadius: '15px',
                    overflowY: "auto",
                    overflowX: "hidden",
                    position: "relative",
                    pt: "0px"
                }}
            >

                <Box
                    sx={{
                        width: '100%',
                        height: "80px",
                        display: 'flex',
                        justifyContent: 'center',
                        pt: '20px',
                        position: "sticky",
                        // bgcolor: "background.paper",
                        top: "0%",
                        right: "2%"
                    }}
                >
                    <SearchInput onSearch={handleInputSearch} />
                    <Box sx={{pl:"20px"}}>
                        <QrCode2Icon  onClick={(() => setShowScaneer(true))} />
                    </Box>



                </Box>
                {showActivity ? (
                    <ActivityRegister />
                ) : (
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            borderRadius: '15px',
                            overflow: 'hidden',
                            justifyContent: 'center',
                            pt: '20px',
                        }}
                    >
                        {searchTerm === '' ? (
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                
                                 {showScanner ? ( <QrScanner closeScanner={() => {
                                    stopAllCameras(), setShowScaneer(false)
                                 }}/>) : (<>
                                 <Typography sx={{ color: "GrayText", fontSize: "20px", pb: "20px", pt: "20px" }}>No hay busquedas</Typography>
                                <img width={300} src={imageSearch} alt="search_image" /></>)} 
                            </Box>
                        ) : (
                            <DataUserAccesUI
                                dataUser={userData}
                                isUserSelect={isUserSelected}
                                message={mostrarMensaje}
                                searchBy={searchTerm}

                            />
                        )}
                    </Box>
                )}

                   
            </Box>

            {showMessage && (
                <ShowMessageSuccess
                    title={'Registro exitoso'}
                    description={'La entrada del usuario fue registrada exitosamente '}
                    type={'success'}
                />
            )}
           

        </Box>
    );
}

export default ControlAcces;
