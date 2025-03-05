import React, { useState } from 'react';
import style from './SideBar.module.css'
import { Link } from 'react-router-dom';

import imageLogo from '../../assets/images/logoprincipal.png'

import HomeIcon from '@mui/icons-material/Home';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
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
                <Link to="/dashboard">
                    <div
                        className={activeLink === "inicio" ? style.activeLink : "inicio"}
                        onClick={() => handleClick("inicio")}>
                        <HomeIcon sx={{ color: "white" }} /><p>Inicio</p>
                    </div>
                </Link>
                <Link to="membresias">
                    <div className={activeLink === "Miembros" ? style.activeLink : ""}
                        onClick={() => handleClick("Miembros")}>
                        <GroupAddRoundedIcon sx={{ color: "white" }}></GroupAddRoundedIcon><p>Miembros</p>
                    </div>
                </Link>



                <Link to="*">
                    <div className={activeLink === "Membresias" ? style.activeLink : ""}
                        onClick={() => handleClick("Membresias")}>
                        <LocalActivityIcon sx={{ color: "white" }} /><p>Membresias</p>
                    </div>
                </Link>
                
                <Link to="*">
                    <div className={activeLink === "Registro" ? style.activeLink : ""}
                        onClick={() => handleClick("Registro")}>
                        <ContactMailIcon sx={{ color: "white" }} /> <p>Control de acceso</p>
                    </div>
                </Link>
                
                
                <Link to="/dashboard/eventos">
                    <div className={activeLink === "Eventos" ? style.activeLink : ""}
                        onClick={() => handleClick("Eventos")}>
                        <EventIcon sx={{ color: "white" }} />  <p>Eventos</p>
                    </div>
                </Link>   

                <Link to="/dashboard/correo">
                    <div className={activeLink === "Email" ? style.activeLink : ""}
                        onClick={() => handleClick("Email")} >
                        <AttachEmailIcon sx={{ color: "white" }} /><p>Email</p>
                    </div>
                </Link>
                
                <Link to="/dashboard/inventario">
                    <div className={activeLink === "Inventario" ? style.activeLink : ""}
                        onClick={() => handleClick("Inventario")}>
                        <InventoryIcon sx={{ color: "white" }} /> <p >Inventario</p>
                    </div>
                </Link>
                
            </div>

            <div className={style.UtilsSideBar}>

                <div>
                    <Link to="/login"><AccountCircleIcon /></Link>
                </div>
                <div>
                    <Link to="/login"><LogoutIcon /></Link>
                </div>



            </div>
        </div>
    );
}

export default SideBar;