import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom';
import style from "./MenuMobile.module.css"


export default function MenuMobile({ open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="menu-mobile-title"
      aria-describedby="menu-mobile-description"
    >
      <Box className={style.modalStyle} >
        <Typography id="menu-mobile-title" variant="h6" component="h2">
          Menú
        </Typography>
        
          <ul style={{ padding: 0, listStyle: 'none' }}>
            <li>
              <Link to="/" onClick={handleClose}>Inicio</Link>
            </li>
            <li>
              <Link to="/about" onClick={handleClose}>Sobre nosotros</Link>
            </li>
            <li>
              <Link to="/prices" onClick={handleClose}>Precios</Link>
            </li>
            <li>
              <Link to="/contact" onClick={handleClose}>Contacto</Link>
            </li>
          </ul>
       
      </Box>
    </Modal>
  );
}
