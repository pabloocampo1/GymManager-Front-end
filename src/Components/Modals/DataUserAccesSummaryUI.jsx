import { Box, Typography } from '@mui/material';

import ButtonActive from '../Buttons/ButtonActive';
import ButtonInactive from '../Buttons/ButtonInactive';
import { useEffect, useState } from 'react';
import DataUserAccesAllInfo from './DataUserAccesAllInfo';
import noData from "../../assets/images/undraw_no-data_ig65.svg"

const DataUserAccesUI = ({ dataUser = [], isUserSelect, message, searchBy }) => {
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
            bgcolor: "#ffffff",
            border: "1px solid #F9F9F9"
        }}>
            {isUserSelect && (
                dataUser.length > 0 ? (
                    dataUser.map((user, index) => (
                        <Box
                            onClick={() => handleOpen(user)}
                            key={index}
                            sx={{
                                width: "100%",
                                height: "50px",
                                display: "flex",
                                justifyContent: "space-between",
                                p: "10px 20px",
                                m: "10px 0px",
                                alignItems: "center",
                                 bgcolor: "#F9F9F9",

                            }}
                        >
                            <Box sx={{ width: "33.3%", display: "flex", justifyContent: "start", alignItems: "center", flexDirection: "column" }}>
                                <Typography variant="p">{user.username}</Typography>
                            </Box>
                            <Box sx={{ width: "33.3%", display: "flex", justifyContent: "center" }}>
                                <Typography variant="p">{user.dni}</Typography>
                            </Box>
                            <Box sx={{ width: "33.3%", display: "flex", justifyContent: "end" }}>
                                {user.membershipStatus ? (<ButtonActive text="Activo"></ButtonActive>) : (<ButtonInactive text="Activo" />)}
                            </Box>

                        </Box>
                    ))
                ) : (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <Typography sx={{color:"GrayText", fontSize:"20px", pb:"20px", pt:"20px"}}>No hay resultados con ese parametro: {searchBy}</Typography>
                        <img width={200} src={noData} alt="search_image" />
                    </Box>
                )
            )
            }
            {open && <DataUserAccesAllInfo open={open} onClose={handleClose} userId={dataByUserSelect.userId} message={message}  />
            }

        </Box>
    );
};

export default DataUserAccesUI;