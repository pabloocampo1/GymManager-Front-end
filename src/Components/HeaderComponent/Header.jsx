import React, { useState } from 'react';
import style from './Header.module.css'
import { Link } from 'react-router-dom';

import ImageLogoPrincipal from "../../assets/images/imageVallHallaLogo.png"
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import MenuMobile from '../MenuMobileComponent/MenuMobile';
import Brightness4Icon from '@mui/icons-material/Brightness4';


function Header() {
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const handleShowMenu = () => {
        if (isOpenMenu) {
            setIsOpenMenu(false)
        } else {
            setIsOpenMenu(true)
        }
    }

    return (
        <header className={style.headerContainer}>
            <div className={style.header_image_logo}>
                <img src={ImageLogoPrincipal} alt="logo principal vallhalla" />
            </div>
            {isOpenMenu ? <MenuMobile open={isOpenMenu} handleClose={handleShowMenu} /> : (<div className={style.header_navbar}>
                <nav>
                    <ol>
                        <li>
                            <Link to="/">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link to="/dfdf">
                                Sobre nosotros
                            </Link>
                        </li>
                        <li>
                            <Link to="/dfdf">
                                Precios
                            </Link>
                        </li>
                        <li>
                            <Link to="/dfdf">
                                Eventos
                            </Link>
                        </li>
                        <li>
                            <Link to="/dfdf">
                                Contacto
                            </Link>
                        </li>
            
                    </ol>
                </nav>
            </div>)}
            <div className={style.header_icon_login}>

                <Brightness4Icon className={style.icon_darkMode} ></Brightness4Icon>
                <Link to="/login">
                    <button>
                        <p>Ingresar</p>
                        <LoginIcon className={style.icon_login} />
                    </button>
                    
                </Link>
               

                <div className={style.inactive}>
                    <MenuIcon
                        className={`${style.menuHamburguesa}`}
                        onClick={() => handleShowMenu()}
                    />
                </div>
            </div>
        </header>
    );
}

export default Header