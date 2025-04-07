import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ArrowBack } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import ShowMessageSuccess from '../ShowMessageSuccess';
import { useState } from 'react';

export default function ModalVisitRegular({ open, handleClose }) {

    const [userDataVisit, setUserDataVisit] = React.useState({
        name: null,
        DNI: null,
    })

    const [messageSuccess, setMessageSuccess] = useState(false);
    const showMessage = () => {
        setMessageSuccess(true);        
        setTimeout(() => {
            setMessageSuccess(false)
            handleClose()
        }, 1000)
    }

    const handleInputChange = (e) => {
        setUserDataVisit({
            ...userDataVisit,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        showMessage()
      
    };

    return (
        <Box>
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
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    minWidth: "650px",
                    bgcolor: 'background.paper',
                    p: "20px",
                    borderRadius: "15px"
                }}
            >
                <Box sx={{ position: "relative", width: "100%", height: "auto", display: "flex", pb: "40px", justifyContent: "center" }}>
                    <Box sx={{ position: "absolute", left: "0", display: "flex", justifyContent: "center", alignItems: "center", cursor: "alias" }} onClick={() => handleClose()}>
                        <ArrowBack sx={{ opacity: "0.50" }} /> <Typography sx={{ opacity: "0.50" }}>volver</Typography>
                    </Box>
                    <Typography id="modal-modal-title" variant="h5">
                        Registrar Visitan Regular
                    </Typography>
                </Box>
                <Box sx={{ width: "100%", height: "auto", }}>
                    <form onSubmit={(e) => { handleSubmit(e) }} style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center" }} >
                        <TextField id="outlined-search" name='name' label="Nombre completo" size='small' type="text" required onChange={handleInputChange} sx={{ pb: "20px", borderRadius: "15px" }} />
                        <TextField id="outlined-search" name='DNI' label="Cedula" size='small' type="number" required onChange={handleInputChange} sx={{}} />
                        <Button type='submit' variant='outlined' sx={{ mt: "40px", mb: "20px", }}>Registrar Entrada</Button>
                    </form>
                </Box>
               
            </Box>
        </Modal>
        {messageSuccess && (<ShowMessageSuccess title={"Registro Exitoso"} description={`Se Registro la entrada al usuario ${userDataVisit.name} correctamente`} type={"success"} />)}
        </Box>
    );
}
