import React, { useState, useEffect } from 'react';
import style from './SideBar.module.css'
import { Link, useNavigate } from 'react-router-dom';

import imageLogo from '../../assets/images/logoprincipal.png'

import HomeIcon from '@mui/icons-material/Home';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import EventIcon from '@mui/icons-material/Event';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import InventoryIcon from '@mui/icons-material/Inventory';
import ExitConfirm from "./ExitConfirmation/ExitConfirmation"

function SideBar() {
    const [activeLink, setActiveLink] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const navigate = useNavigate();
    const [mostrarModal, setMostrarModal] = useState(false);


    const handleClick = (link) => {
        setActiveLink(link)
    }

    const handleNavigate = (path) => {
        navigate(path);
    }

    // Function to load profile image from localStorage
    const loadProfileImage = () => {
        const savedImage = localStorage.getItem('profileImage');
        if (savedImage) {
            setProfileImage(savedImage);
        }
    };

    useEffect(() => {
        handleClick("inicio");
        loadProfileImage();
        
    
        const handleProfileUpdate = () => {
            loadProfileImage();
        };
        
        window.addEventListener('profileUpdated', handleProfileUpdate);
        

        return () => {
            window.removeEventListener('profileUpdated', handleProfileUpdate);
        };
    }, []);

    
    useEffect(() => {
        
        const handleStorageChange = (e) => {
            if (e.key === 'profileImage') {
                loadProfileImage();
            }
        };
        
        window.addEventListener('storage', handleStorageChange);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <div className={style.mmm}>
        <div className={style.container_sideBar}>

            <div className={style.imageContainer}>
                <img src={imageLogo} alt="logo gymManager" />
            </div>

            <div className={style.navegationList}>
                <div
                    className={activeLink === "inicio" ? style.activeLink : "inicio"}
                    onClick={() => { handleClick("inicio"), handleNavigate("/dashboard") }}>
                    <HomeIcon sx={{ color: "white" }} /><p>Inicio</p>
                </div>
                <div className={activeLink === "Miembros" ? style.activeLink : ""}
                    onClick={() => { handleClick("Miembros"), handleNavigate("/dashboard/miembros") }}>
                    <GroupAddRoundedIcon sx={{ color: "white" }}></GroupAddRoundedIcon><p>Miembros</p>
                </div>
                <div className={activeLink === "Membresias" ? style.activeLink : ""}
                    onClick={() => { handleClick("Membresias"), handleNavigate("/dashboard/membresias") }}>
                    <LocalActivityIcon sx={{ color: "white" }} /><p>Membresias</p>
                </div>
                <div className={activeLink === "Registro" ? style.activeLink : ""}
                    onClick={() => { handleClick("Registro"), handleNavigate("/dashboard/acceso") }}>
                    <ContactMailIcon sx={{ color: "white" }} /> <p>Control de acceso</p>
                </div>
                <div className={activeLink === "Eventos" ? style.activeLink : ""}
                    onClick={() => { handleClick("Eventos"), handleNavigate("/dashboard/eventos") }}>
                    <EventIcon sx={{ color: "white" }} />  <p>Eventos</p>
                </div>
                <div className={activeLink === "Email" ? style.activeLink : ""}
                    onClick={() => { handleClick("Email"), handleNavigate("/dashboard/correo") }} >
                    <AttachEmailIcon sx={{ color: "white" }} /><p>Email</p>
                </div>
                <div className={activeLink === "Inventario" ? style.activeLink : ""}
                    onClick={() => { handleClick("Inventario"), handleNavigate("/dashboard/inventario") }}>
                    <InventoryIcon sx={{ color: "white" }} /> <p >Inventario</p>
                </div>
            </div> 

            <div className={style.UtilsSideBar}>
                <div className={activeLink === "perfil" ? style.activeLink : ""} onClick={() => {handleClick("perfil"), handleNavigate("/dashboard/perfil") } }>
                    <Link to="/dashboard/perfil">
                        {profileImage ? (
                            <div className={style.profileImageContainer}>
                                <img src={profileImage} alt="Foto de perfil" className={style.profileImage} />
                            </div>
                        ) : (
                            <AccountCircleIcon />
                        )}
                    </Link>
                </div>
                <div onClick={() => setMostrarModal(true)} style={{ cursor: 'pointer' }}>
                    <LogoutIcon />
                </div>

            </div>
            
        </div>
        {mostrarModal && (
            <ExitConfirm 
            onConfirm={() => {
            setMostrarModal(false);
            navigate("/"); // o cerrar sesión aquí
        }}
        onClose={() => setMostrarModal(false)}
        />
)}

        </div>
        
    );
    
}

export default SideBar;