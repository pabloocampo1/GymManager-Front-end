import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import { Typography } from '@mui/material';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import UserDetails from '../UserDetails';


const users = [
    { name: "Juan", registeredAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) }, // Hace 3 días
    { name: "María", registeredAt: new Date(Date.now() - 5 * 60 * 60 * 1000) },    // Hace 5 horas
    { name: "Carlos", registeredAt: new Date(Date.now() - 30 * 60 * 1000) },       // Hace 30 min
    { name: "Sofía", registeredAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, // Hace 7 días
    { name: "Andrés", registeredAt: new Date(Date.now() - 1 * 60 * 1000) },        // Hace 1 min
    { name: "Lucía", registeredAt: new Date(Date.now() - 10 * 1000) },            // Hace 10 seg
    { name: "Diego", registeredAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) }, // Hace 14 días
    { name: "Fernanda", registeredAt: new Date(Date.now() - 2 * 60 * 60 * 1000) }, // Hace 2 horas
];


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



export default function ListNewUsers() {
    const [selectedUser, setSelectedUser] = React.useState(null);
  
    const handleUserClick = (user) => {
      setSelectedUser(user);
    }; 
    const [open, setOpen] = React.useState(false);
   
    const handleClose = () => setOpen(false);
  
    return (
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box
          sx={{
            width: '250px',
            maxWidth: 360,
            bgcolor: 'background.paper',
            overflow: 'hidden',
          }}
        >
          <Typography sx={{ fontWeight: "bold", textAlign: "center", py: 2 }}>
            Usuarios recientes
          </Typography>
          <FixedSizeList
            height={300}
            width={360}
            itemSize={46}
            itemCount={users.length}
            overscanCount={5}
            itemData={{ users, onUserClick: handleUserClick,  }}
          >
            {({ index, style, data }) => {
              const user = data.users[index];
              return (
                <ListItem
                  sx={{ width: "100%" }}
                  style={style}
                  key={index}
                  component="div"
                  disablePadding
                >
                  <ListItemButton onClick={() => {data.onUserClick(user), setOpen(true)}}>
                    <FiberNewIcon sx={{ color: "blue", opacity: "0.80" }} />
                    <ListItemText sx={{ ml: "10px" }} primary={`${user.name} - ${getTimeAgo(user.registeredAt)}`} />
                  </ListItemButton>
                </ListItem>
              );
            }}
          </FixedSizeList>
        </Box>
  
        {open && <UserDetails open={open} handleClose={handleClose} data={selectedUser}  />}
      </Box>
    );
  }
  
