import { Box, Typography } from '@mui/material';

import ButtonActive from '../Buttons/ButtonActive';
import ButtonInactive from '../Buttons/ButtonInactive';
import { useEffect, useState } from 'react';
import DataUserAccesAllInfo from './DataUserAccesAllInfo';


const DataUserAccesUI = ({ dataUser = [], isUserSelect, message }) => {
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
                                height:"50px",
                                display: "flex",
                                justifyContent: "space-between",
                                p: "10px 20px",
                                m: "10px 0px",
                                alignItems: "center",
                                bgcolor: "#FFFFFF",

                            }}
                        >
                            <Box sx={{width:"33.3%", display:"flex", justifyContent:"start",alignItems:"center", flexDirection:"column"} }>
                                <Typography variant="p">{user.name}</Typography>
                            </Box>
                            <Box sx={{width:"33.3%", display:"flex", justifyContent:"center"}}>
                                <Typography variant="p">{user.DNI}</Typography>
                            </Box>
                            <Box sx={{width:"33.3%", display:"flex", justifyContent:"end"}}>
                                {user.estado == "Activa" ? (<ButtonActive text={user.estado}></ButtonActive>) : (<ButtonInactive text={user.estado} />)}
                            </Box>

                        </Box>
                    ))
                ) : (
                    <Typography color="white" textAlign="center">No se encontraron </Typography>
                )
            ) : console.log("perra")
            }
            {open && <DataUserAccesAllInfo open={open} onClose={handleClose} data={dataByUserSelect} message={message} />
            }

        </Box>
    );
};

export default DataUserAccesUI;