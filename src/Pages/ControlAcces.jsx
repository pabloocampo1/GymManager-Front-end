import {
    Box,
    Button,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchInput from '../Components/SearchInputComponent';
import ModalVisitRegular from '../Components/Modals/ModalVisitRegular';
import DataUserAccesUI from '../Components/Modals/DataUserAccesSummaryUI';
import ShowMessageSuccess from '../Components/ShowMessageSuccess';
import QrCode2Icon from '@mui/icons-material/QrCode2';

function ControlAcces() {
    const [isUserSelected, setIsUserSelected] = useState(false);
    const [open, setOpen] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [userData] = useState([
        {
            name: 'Juan Pérez',
            DNI: '12345678',
            fechaNacimiento: '1990-01-01',
            telefono: '3123456789',
            email: 'juan.perez@example.com',
            genero: 'Masculino',
            telefonoEmergencia: '3111234567',
            membresia: 'Premium',
            fechaInscripcion: '2024-04-01',
            estado: 'Inactiva',
            inicio: '2024-04-01',
            fin: '2025-04-01',
            diasRestantes: 0,
        },
        {
            name: 'Laura Gómez',
            DNI: '87654321',
            fechaNacimiento: '1985-06-15',
            telefono: '3109876543',
            email: 'laura.gomez@example.com',
            genero: 'Femenino',
            telefonoEmergencia: '3101234567',
            membresia: 'Básica',
            fechaInscripcion: '2023-12-10',
            estado: 'Activa',
            inicio: '2023-12-10',
            fin: '2024-12-10',
            diasRestantes: 250,
        },
        {
            name: 'Carlos Ramírez',
            DNI: '11223344',
            fechaNacimiento: '1995-03-22',
            telefono: '3134567890',
            email: 'carlos.ramirez@example.com',
            genero: 'Masculino',
            telefonoEmergencia: '3131122334',
            membresia: 'Premium',
            fechaInscripcion: '2024-01-05',
            estado: 'Activa',
            inicio: '2024-01-05',
            fin: '2025-01-05',
            diasRestantes: 280,
        },
        {
            name: 'Ana Torres',
            DNI: '55667788',
            fechaNacimiento: '1998-11-03',
            telefono: '3142233445',
            email: 'ana.torres@example.com',
            genero: 'Femenino',
            telefonoEmergencia: '3149988776',
            membresia: 'Plus',
            fechaInscripcion: '2024-03-20',
            estado: 'Activa',
            inicio: '2024-03-20',
            fin: '2025-03-20',
            diasRestantes: 350,
        },
        {
            name: 'Diego López',
            DNI: '33445566',
            fechaNacimiento: '1982-09-30',
            telefono: '3151122334',
            email: 'diego.lopez@example.com',
            genero: 'Masculino',
            telefonoEmergencia: '3154455667',
            membresia: 'Básica',
            fechaInscripcion: '2023-05-01',
            estado: 'Vencida',
            inicio: '2023-05-01',
            fin: '2024-05-01',
            diasRestantes: 0,
        },
    ]);

    const mostrarMensaje = () => {
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 2000);
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
            {open && <ModalVisitRegular open={open} handleClose={handleClose} />}

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
                    Registrar entrada de miembros
                </Typography>
                <Button
                    onClick={handleOpen}
                    variant="contained"
                    sx={{ bgcolor: 'var(--primary-color)', color: 'black' }}
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
                        'No hay resultados'
                    ) : (
                        <DataUserAccesUI
                            dataUser={userData}
                            isUserSelect={isUserSelected}
                            message={mostrarMensaje}
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
