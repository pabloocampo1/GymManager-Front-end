import {
    Box,
    Button,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchInput from '../../Components/SearchInputComponent';
import ModalVisitRegular from '../../Components/Modals/ModalVisitRegular';
import DataUserAccesUI from '../../Components/Modals/DataUserAccesSummaryUI';
import ShowMessageSuccess from '../../Components/ShowMessageSuccess';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import { api } from '../../Service/api';
import  imageSearch  from "../../assets/images/undraw_search-control_k649.svg"

function ControlAcces() {
    const [isUserSelected, setIsUserSelected] = useState(false);
    const [open, setOpen] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [userData, setUserData] = useState('');

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
        setIsUserSelected(true);
    };

    useEffect(() => {
        setIsUserSelected(false);
    }, []);

    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '100vh',
                p: '20px 100px',
                bgcolor: 'var(--backgroundWhiteMiddle)',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            {open && <ModalVisitRegular open={open} handleClose={handleClose}  ShowMessageSuccess={mostrarMensaje} />}

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
                <Button
                    onClick={handleOpen}
                    variant="outlined"
                    sx={{  border:"2px solid rgb(255, 219, 0)", color: 'rgb(0, 0, 0)' }}
                >
                    Visita Regular
                </Button>
            </Box>

            <Box
                sx={{
                    bgcolor: 'white',
                    width: '100%',
                    height: '60vh',
                    borderRadius: '15px',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        pt: '20px',
                    }}
                >
                    <SearchInput onSearch={handleInputSearch} />
                    <Box>
                        <QrCode2Icon />
                    </Box>
                </Box>

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
                        <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column" }}>
                            <Typography sx={{color:"GrayText", fontSize:"20px", pb:"20px", pt:"20px"}}>No hay busquedas</Typography>
                            <img width={300} src={imageSearch} alt="search_image" />
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
