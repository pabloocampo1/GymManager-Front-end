import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import { Typography } from '@mui/material';
import FiberNewIcon from '@mui/icons-material/FiberNew';

// Datos con nombres y fechas de registro
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

// Función para renderizar cada fila de la lista
function renderRow(props) {
  const { index, style, data } = props;
  const user = data[index];

  return (
    <ListItem sx={{ width: "100%" }} style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <FiberNewIcon sx={{ color: "blue", opacity: "0.80" }} />
        <ListItemText sx={{ ml: "10px" }} primary={`${user.name} - ${getTimeAgo(user.registeredAt)}`} />
      </ListItemButton>
    </ListItem>
  );
}

export default function ListNewUsers() {
  return (
    <Box
      sx={{
        width: '250px',
        height: 'auto',
        maxWidth: 360,
        display: "flex",
        flexDirection: "column",
        bgcolor: 'background.paper',
        overflow: 'hidden',
      }}
    >
      <Typography variant='p' sx={{ fontWeight: "bold", textAlign: "center", pb: "10px", pt: "10px" }}>
        Usuarios recientes
      </Typography>
      <FixedSizeList
        height={300}
        width={360}
        itemSize={46}
        itemCount={users.length}
        overscanCount={5}
        itemData={users} // Pasar los datos completos
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}
