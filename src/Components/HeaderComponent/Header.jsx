import React, { useState } from 'react';
import style from './Header.module.css'
import { Link } from 'react-router-dom';
import ImageLogoPrincipal from "../../assets/images/logoSinFondo.png"
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import MenuMobile from '../MenuMobileComponent/MenuMobile';


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
                            <Link to="/#home">
                                Inicio
                            </Link>
                        </li>



                        <li>
                            <Link  to="/#aboutUs" href="#aboutUs">
                                Sobre nosotros
                            </Link>
                        </li>

                        <li>
                            <Link to="/#price">
                                Precios
                            </Link>
                        </li>

                        <li>
                            <Link  to="eventsHome#events">
                                Eventos
                            </Link>
                        </li>
                        <li>
                            <Link to="contact#contact">
                                Contacto
                            </Link>
                        </li>

                    </ol>
                </nav>
            </div>)}
            <div className={style.header_icon_login}>
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