import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

export default function DataUserAccesAllInfo({ open, onClose, data=[] }) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    minWidth: "500px",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: "15px", 
                }}
            >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                   Usaario: {data.name}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
                <Button
                    onClick={onClose}
                    variant="contained"
                    sx={{ mt: 2, display: "block", mx: "auto" }}
                >
                    Cerrar
                </Button>
            </Box>
        </Modal>
    );
}
