
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import { Typography } from '@mui/material';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import UserDetails from '../UserDetails';
import { api } from "../../Service/api";
import { useState } from 'react';
import { useEffect } from 'react';




const getTimeAgo = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    if (diffInSeconds < 60) return `hace ${diffInSeconds} seg`;

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `hace ${diffInMinutes} min`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `hace ${diffInHours} horas`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `hace ${diffInDays} días`;
};



const ListNewUsers = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [dataUsers, setDataUsers] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const fetchData = await api.get("/api/members/getLastRegisteredUser");
                setDataUsers(fetchData.data)
              
            } catch (error) {
                console.error(error);

            }
        }

        getData();
    }, [])

 
    const handleUserClick = (user) => {
        setSelectedUser(user);
    };
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);

    return (
        <Box sx={{ display: "flex", gap: 2 }}>
            <Box
                sx={{
                    width: '250px',
                    maxWidth: 370,
                    bgcolor: "background.paper",
                    overflow: 'hidden',
                }}
            >
                <Typography sx={{ fontWeight: "bold", textAlign: "center", py: 2 }}>
                    Usuarios recientes
                </Typography>
                <FixedSizeList
                    height={320}
                    width={360}
                    itemSize={46}
                    itemCount={dataUsers.length}
                    overscanCount={5}
                    itemData={{ dataUsers, onUserClick: handleUserClick, }}
                >
                    {({ index, style, data }) => {
                        const user = data.dataUsers[index];
                        return (
                            <ListItem
                                sx={{ width: "100%" }}
                                style={style}
                                key={index}
                                component="div"
                                disablePadding
                            >
                                <ListItemButton onClick={() => { data.onUserClick(user), setOpen(true) }}>
                                    <FiberNewIcon sx={{ color: "black", opacity: "0.80" }} />
                                    <ListItemText sx={{ ml: "10px" }}  primary={`${user.fullName} - ${getTimeAgo(new Date(user.createDate))}`} />
                                </ListItemButton>
                            </ListItem>
                        );
                    }}
                </FixedSizeList>
            </Box>

            {open && <UserDetails open={open} handleClose={handleClose} data={selectedUser} />}
        </Box>
    );
}

export default ListNewUsers;

