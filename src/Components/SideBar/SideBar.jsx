import React, { useState } from 'react';
import style from './SideBar.module.css'
import { Link } from 'react-router-dom';

import imageLogo from '../../assets/images/logoprincipal.png'

import HomeIcon from '@mui/icons-material/Home';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { Button, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import EventIcon from '@mui/icons-material/Event';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import InventoryIcon from '@mui/icons-material/Inventory';

function SideBar() {
    const [activeLink, setActiveLink] = useState("");

    const handleClick = (link) => {
        setActiveLink(link)
    }
   

    return (
        <div className={style.container_sideBar}>

            <div className={style.imageContainer}>
                <img src={imageLogo} alt="logo gymManager" />
            </div>

            <div className={style.navegationList}>
                <div 
                    className={activeLink ==="inicio" ? style.activeLink : "inicio"}
                    onClick={() => handleClick("inicio")}>
                    <HomeIcon sx={{color:"white"}} /><Link to="/dashboard">Inicio</Link>
                </div>

                <div className={activeLink ==="Miembros" ? style.activeLink : ""}
                    onClick={() => handleClick("Miembros")}>
                    <GroupAddRoundedIcon sx={{color:"white"}}></GroupAddRoundedIcon><Link to="membresias">Miembros</Link>
                </div>

                <div className={activeLink ==="Membresias" ? style.activeLink : ""}
                    onClick={() => handleClick("Membresias")}>
                    <LocalActivityIcon sx={{color:"white"}} /><Link to="user">Membresias</Link>    
                </div>
                <div className={activeLink ==="Registro" ? style.activeLink : ""}
                    onClick={() => handleClick("Registro")}>
                   <ContactMailIcon sx={{color:"white"}} /> <Link to="user">Control de acceso</Link>    
                </div>
                <div className={activeLink ==="Eventos" ? style.activeLink : ""}
                    onClick={() => handleClick("Eventos")}>
                    <EventIcon sx={{color:"white"}} />  <Link to="user">Eventos</Link>    
                </div>
                <div className={activeLink ==="Email" ? style.activeLink : ""}
                    onClick={() => handleClick("Email")} >
                    <AttachEmailIcon sx={{color:"white"}} /><Link to="correo">Email</Link>    
                </div>
                <div className={activeLink ==="Inventario" ? style.activeLink : ""}
                    onClick={() => handleClick("Inventario")}>
                   <InventoryIcon sx={{color:"white"}} /> <Link to="user">Inventario</Link>    
                </div>
            </div>

            <div className={style.UtilsSideBar}>
                
                <div>
                    <Link to="/login"><AccountCircleIcon /></Link>
                </div>
                <div>
                    <Link to="/login"><SettingsIcon /></Link>
                </div>
                <div>
                    <Link to="/login"><LogoutIcon /></Link>
                </div>
                
                
                
            </div>
        </div>
    );
}

export default SideBar;