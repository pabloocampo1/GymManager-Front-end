import { Box, Typography } from '@mui/material';

import ButtonActive from './Buttons/ButtonActive';
import ButtonInactive from './Buttons/ButtonInactive';
import {  useEffect, useState } from 'react';
import DataUserAccesAllInfo from './DataUserAccesAllInfo';


const DataUserAccesUI = ({ dataUser = [], isUserSelect }) => {
    const [open, setOpen] = useState(false);
    const [dataByUserSelect, setDataUserSelect] = useState({});

    const handleOpen = (infoUser) => {
        setDataUserSelect(infoUser)
        setOpen(true)
    };
    const handleClose = () => setOpen(false);

   useEffect(() => {

   }, [open])

    return (
        <Box sx={{
            width: "100%",
            height: "auto",
            bgcolor: "#F9F9F9",
            border: "1px solid #F9F9F9"
        }}>
            {isUserSelect ? (
                dataUser.length > 0 ? (
                    dataUser.map((user, index) => (
                        <Box
                            onClick={() => handleOpen(user)}
                            key={index}
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                                p: "10px 20px",
                                m: "10px 0px",
                                alignItems: "center",
                                bgcolor: "#FFFFFF",
                                
                            }} 
                        >
                            <Typography variant="h6">{user.name}</Typography>
                            <Typography variant="body2">DNI: {user.DNI}</Typography>
                            {user.status ? <ButtonActive text={"Activo"} /> : <ButtonInactive text={"Membresia vencida"} />}
                        </Box>
                    ))
                ) : (
                    <Typography color="white" textAlign="center">No se encontraron </Typography>
                )
            ) : console.log("perra")
            }
            {open && <DataUserAccesAllInfo open={open} onClose={handleClose} data={dataByUserSelect} />
            }
        </Box>
    );
};

export default DataUserAccesUI;