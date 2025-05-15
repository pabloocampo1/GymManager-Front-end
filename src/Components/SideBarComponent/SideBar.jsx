import React, { useState, useEffect, useContext } from 'react';
import style from './SideBar.module.css'
import { Link, useNavigate, useLocation } from 'react-router-dom';

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
import { AuthContext } from '../../Context/AuthContext';

function SideBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useContext(AuthContext);

    const [activeLink, setActiveLink] = useState("");

    const [profileImage, setProfileImage] = useState(null);

    const routeMap = {
        "/dashboard": "inicio",
        "/dashboard/miembros": "Miembros",
        "/dashboard/membresias": "Membresias",
        "/dashboard/acceso": "Registro",
        "/dashboard/eventos": "Eventos",
        "/dashboard/correo": "Email",
        "/dashboard/inventario": "Inventario",
        "/dashboard/perfil": "perfil"
    };

    
    useEffect(() => {
        const current = routeMap[location.pathname] || "inicio";
        setActiveLink(current);
        localStorage.setItem('activeLink', current);
    }, [location.pathname]);

   
    useEffect(() => {
        const storedLink = localStorage.getItem('activeLink');
        if (storedLink) {
            setActiveLink(storedLink);
        }
        loadProfileImage();

        const handleProfileUpdate = () => loadProfileImage();
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

    const handleNavigate = (path, name) => {
        setActiveLink(name);
        localStorage.setItem('activeLink', name); 
        navigate(path);
    };

    const loadProfileImage = () => {
        const savedImage = localStorage.getItem('profileImage');
        if (savedImage) {
            setProfileImage(savedImage);
        }
    };

    return (
        <div className={style.container_sideBar}>
            <div className={style.imageContainer}>
                <img src={imageLogo} alt="logo gymManager" />
            </div>

            <div className={style.navegationList}>
                <div className={activeLink === "inicio" ? style.activeLink : ""}
                    onClick={() => handleNavigate("/dashboard", "inicio")}>
                    <HomeIcon sx={{ color: "white" }} /><p>Inicio</p>
                </div>
                <div className={activeLink === "Miembros" ? style.activeLink : ""}
                    onClick={() => handleNavigate("/dashboard/miembros", "Miembros")}>
                    <GroupAddRoundedIcon sx={{ color: "white" }} /><p>Miembros</p>
                </div>
                <div className={activeLink === "Membresias" ? style.activeLink : ""}
                    onClick={() => handleNavigate("/dashboard/membresias", "Membresias")}>
                    <LocalActivityIcon sx={{ color: "white" }} /><p>Membresias</p>
                </div>
                <div className={activeLink === "Registro" ? style.activeLink : ""}
                    onClick={() => handleNavigate("/dashboard/acceso", "Registro")}>
                    <ContactMailIcon sx={{ color: "white" }} /><p>Control de acceso</p>
                </div>
                <div className={activeLink === "Eventos" ? style.activeLink : ""}
                    onClick={() => handleNavigate("/dashboard/eventos", "Eventos")}>
                    <EventIcon sx={{ color: "white" }} /><p>Eventos</p>
                </div>
                <div className={activeLink === "Email" ? style.activeLink : ""}
                    onClick={() => handleNavigate("/dashboard/correo", "Email")}>
                    <AttachEmailIcon sx={{ color: "white" }} /><p>Email</p>
                </div>
                <div className={activeLink === "Inventario" ? style.activeLink : ""}
                    onClick={() => handleNavigate("/dashboard/inventario", "Inventario")}>
                    <InventoryIcon sx={{ color: "white" }} /><p>Inventario</p>
                </div>
            </div>

            <div className={style.UtilsSideBar}>
                <div className={activeLink === "perfil" ? style.activeLink : ""}
                    onClick={() => handleNavigate("/dashboard/perfil", "perfil")}>
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
                <div>
                    <LogoutIcon onClick={() => logout()} />
                </div>
            </div>
        </div>
    );
}

export default SideBar;