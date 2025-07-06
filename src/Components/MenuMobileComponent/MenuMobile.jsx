import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import style from "./MenuMobile.module.css"

import imageLogoGym from "../../assets/images/logoprincipal.png"
import { MaterialUISwitch } from '../ButtonDarkMode';


export default function MenuMobile({ open, handleClose }) {
    const [checked, setChecked] = useState(false);
    const handleChecked = () => {
        setChecked(event.target.checked);
        return checked ? console.log("sun") : console.log("dark");
        ;

    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="menu-mobile-title"
            aria-describedby="menu-mobile-description"
        >
            <Box className={style.modalStyle} >
                <div className={style.container_logo}>
                    <img src={imageLogoGym} alt="imagen del gimansio" />
                </div>

                <div className={style.container_links}>
                    <ul style={{ padding: 0, listStyle: 'none' }}>
                        <li>
                            <Link to="/#home" onClick={handleClose}>
                                Inicio
                            </Link>
                        </li>



                        <li>
                            <Link to="/#aboutUs" onClick={handleClose}>
                                Sobre nosotros
                            </Link>
                        </li>

                        <li>
                            <Link to="/#price" onClick={handleClose}>
                                Precios
                            </Link>
                        </li>

                        <li>
                            <Link to="eventsHome#events" onClick={handleClose}>
                                Eventos
                            </Link>
                        </li>
                        <li>
                            <Link to="#contact" onClick={handleClose}>
                                Contacto
                            </Link>
                        </li>

                    </ul>
                </div>

                <div className={style.container_option}>
                    <MaterialUISwitch className={style.icon_darkMode} checked={checked} onChange={handleChecked} />
                    <Link to="/login">
                        <button>
                            <p>Ingresar</p>
                            <LoginIcon className={style.icon_login} />

                        </button>

                    </Link>
                </div>


            </Box>
        </Modal>
    );
}
