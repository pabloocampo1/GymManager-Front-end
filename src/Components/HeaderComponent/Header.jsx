import React, { useState } from 'react';
import { Box, IconButton, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ImageLogoPrincipal from '../../assets/images/logoSinFondo.png';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import MenuMobile from '../MenuMobileComponent/MenuMobile';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';


import { MaterialUISwitch } from '../ButtonDarkMode';
import { useThemeCtx } from '../../Context/ThemeContext';

function Header() {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
     const { darkMode, toggleDarkMode } = useThemeCtx();
   


    const handleShowMenu = () => {
        setIsOpenMenu(!isOpenMenu);
    };

    return (
        <Box
            component="header"
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: { xs: '12vh', lg: '9vh' },
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'black',
                backdropFilter: 'blur(9px)',
                borderBottom: '1px solid rgb(96, 96, 96)',
                zIndex: 1000,
                px: { xs: 2, md: 10 },
                transition: 'background 0.3s ease-in-out',
            }}
        >
            {/* Logo */}
            <Box sx={{ width: '20%', height: '100%' }}>
                <Box
                    component="img"
                    src={ImageLogoPrincipal}
                    alt="logo principal vallhalla"
                    sx={{ width: { xs: 100, lg: 200 }, height: '100%' }}
                />
            </Box>

            {/* Menu Desktop */}
            {isOpenMenu ? (
                <MenuMobile open={isOpenMenu} handleClose={handleShowMenu} />
            ) : (
                <Box
                    component="nav"
                    sx={{
                        width: { xs: 0, md: '60%' },
                        height: '100%',
                        display: { xs: 'none', md: 'flex' },
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Box component="ol" sx={{ display: 'flex', p: 0, m: 0, listStyle: 'none' }}>
                        {[
                            { to: '/#home', label: 'Inicio' },
                            { to: '/#aboutUs', label: 'Sobre nosotros' },
                            { to: '/#price', label: 'Precios' },
                            { to: 'eventsHome#events', label: 'Eventos' },
                            { to: '/#contact', label: 'Contacto' },
                        ].map((item, index) => (
                            <Box component="li" key={index} sx={{ px: 2, display: 'flex', alignItems: 'center' }}>
                                <Link to={item.to} style={{ textDecoration: 'none' }}>
                                    <Typography
                                        sx={{
                                            '&:hover': { color: "primary.main" },
                                            cursor: 'pointer',
                                            color: "white"
                                        }}
                                    >
                                        {item.label}
                                    </Typography>
                                </Link>
                            </Box>
                        ))}
                    </Box>
                </Box>
            )}

            {/* Icons */}
            <Box
                sx={{
                    width: '20%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                }}
            >
                <div onClick={toggleDarkMode} title="Modo oscuro" style={{ cursor: 'pointer', color: 'white', marginBottom: '10px', width:"auto", height:"100%",  marginRight:"20px", display:"flex", flexDirection:"column", justifyContent:"center"}}>
                   {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </div>

                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="text"
                            startIcon={<LoginIcon />}
                            sx={{
                                px: 2.8,
                                py: 0.60,
                                minWidth: 'auto',
                                borderRadius: '15px',
                                color: 'primary.main',
                                border: "1px solid #FFDB00",
                                textTransform: 'none',
                                fontWeight: '500',
                                fontSize: '0.95rem',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    color: 'common.white',
                                    transform: 'scale(1.05)',
                                },
                            }}
                        >
                            Ingresar
                        </Button>
                    </Link>
                </Box>


                <Box sx={{ display: { xs: 'inline-block', md: 'none' } }}>
                    <MenuIcon sx={{ color: 'white', cursor: 'pointer' }} onClick={handleShowMenu} />
                </Box>
            </Box>
        </Box>
    );
}

export default Header;
