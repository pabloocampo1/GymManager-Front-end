import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function ModalConfirmDeleteAll({ open, handleClose, confirm }) {


    return (
        <Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Estas seguro que deseas eliminar todos los registros de ingreso?
                    </Typography>
                    <Box sx={{
                        display:"flex",
                       alignItems:"center",
                       justifyContent:"center",
                       mt:"20px"

                    }}>
                        <Button sx={{mr:"10px"}} variant='outlined' onClick={confirm}>Eliminar</Button>
                        <Button variant='contained' onClick={handleClose}>cancelar</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}