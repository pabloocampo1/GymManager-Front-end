import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Add, ArrowBack } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import ShowMessageSuccess from '../../ShowMessageSuccess';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../Service/api';
import SimpleBackdrop from "../../SimpleBackdrop";

export default function ModalVisitRegular({ open, handleClose , ShowMessageSuccess}) {

    const [userDataVisit, setUserDataVisit] = React.useState({
        fullName: null,
        documentId: null,
        phoneNumber: null
    })
    const navigate = useNavigate();
    const [isLoanding, setIslOanding] = useState(false);
    const [errorRequest, setErrorRequest] = useState(false);




    const handleInputChange = (e) => {
        setUserDataVisit({
            ...userDataVisit,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIslOanding(true)

        try {
            const response = await api.post("/api/visits/save", userDataVisit);
            if (response.status == 400 || response.status == 401 || response.status == 500) {
                setIslOanding(false);
                setErrorRequest(true)
                return;
            }
            
              ShowMessageSuccess()
          handleClose()
        } catch (Error) {
            console.error(Error);
            setIslOanding(false);
            setErrorRequest(true)
        }

        setIslOanding(false)
      
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
                      <SimpleBackdrop open={isLoanding} />
                    <Box sx={{ position: "absolute", left: "3%", display: "flex", justifyContent: "center", alignItems: "center", cursor: "alias" }} onClick={() => handleClose()}>
                        <ArrowBack sx={{ opacity: "0.50" }} /> <Typography sx={{ opacity: "0.50" }}>volver</Typography>
                    </Box>
                    <Box sx={{ position: "absolute", right: "2%", bottom: "5%", display: "flex", justifyContent: "center", alignItems: "center", cursor: "alias" }} onClick={() => navigate("/dashboard/miembros")}>
                        <Add sx={{ opacity: "0.50" }} /> <Typography sx={{ opacity: "0.50" }}>Agregar a miembros</Typography>
                    </Box>
                    <Box sx={{ width: "100%", height: "auto", display: "flex", pb: "40px", justifyContent: "center" }}>

                        <Typography id="modal-modal-title" variant="h5">
                            Registrar Visitan Regular
                        </Typography>
                    </Box>
                    <Box sx={{ width: "100%", height: "auto", }}>
                        <form onSubmit={(e) => { handleSubmit(e) }} style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center" }} >
                            <TextField id="outlined-search" name='fullName' label="Nombre completo" size='small' type="text" required onChange={handleInputChange} sx={{ pb: "20px", borderRadius: "15px" }} />
                            <TextField id="outlined-search" name='documentId' label="Cedula" size='small' type="number" required onChange={handleInputChange} sx={{ pb: "20px" }} />
                            <TextField id="outlined-search" name='phoneNumber' label="Numero de telefono" size='small' type="number" required onChange={handleInputChange} />
                            <Button type='submit' variant='outlined' sx={{ mt: "40px", mb: "20px", }}>Registrar Entrada</Button>
                            {errorRequest && (<Typography sx={{color:"red"}}>Error registrabdi visita.</Typography>)}
                        </form>
                    </Box>

                </Box>
            </Modal>
          
        </Box>
    );
}
