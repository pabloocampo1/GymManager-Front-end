import React from 'react';
import style from './Footer.module.css'
import logoGym from "../../assets/images/logoprincipal.png"
import MapLocation from "../MapLocation"
import { Link } from 'react-router-dom';
import { Email, Facebook, Instagram, ReportGmailerrorred, WhatsApp } from '@mui/icons-material';


function Footer() {
    return (
        <footer className={style.footerContainer}>
            <div className={style.seccion_one_footer}>
                <div className={style.container_logo}>
                    <img src={logoGym} alt="logo gym" />
                </div>
                <div className={style.container_information}>
                    <ol>
                        <li>Teléfono: +57 456-7890</li>
                        <li> info@fitnessprogym.com.com</li>
                        <li>Calle plado 123, Medellin, Col</li>
                        <li>Lunes a viernes: 24 horas</li>
                    </ol>
                </div>
                <div>
                    <ol>
                        <li>
                            <Link to="/#home">
                                Inicio
                            </Link>
                        </li>



                        <li>
                            <Link to="/#aboutUs" href="#aboutUs">
                                Sobre nosotros
                            </Link>
                        </li>

                        <li>
                            <Link to="/#price">
                                Precios
                            </Link>
                        </li>

                        <li>
                            <Link to="eventsHome#events">
                                Eventos
                            </Link>
                        </li>
                        <li>
                            <Link to="#contact">
                                Contacto
                            </Link>
                        </li>

                    </ol>
                </div>
                <div className={style.container_map}>

                    <MapLocation />

                </div>
            </div>
            <div className={style.seccion_two_footer}>
            <div className={style.socialMedia}>
    <a 
        href="https://www.facebook.com/valhallagymoficial?locale=es_LA" 
        target="_blank" 
        rel="noopener noreferrer"
    >
        <Facebook sx={{
            color: "white",
            transition: "color 0.1s ease-in-out",
            "&:hover": {
                color: "yellow",
            },
        }} />
    </a>

    <a href="">
        <WhatsApp sx={{
            color: "white",
            transition: "color 0.1s ease-in-out",
            "&:hover": {
                color: "yellow",
            },
        }} />
    </a>

    <a 
        href="https://www.instagram.com/valhalla__gym?igsh=a3lhbGJnbHpmNzNx" 
        target="_blank" 
        rel="noopener noreferrer"
    >
        <Instagram sx={{
            color: "white",
            transition: "color 0.1s ease-in-out",
            "&:hover": {
                color: "yellow",
            },
        }} />
    </a>

    <a href="">
        <Email sx={{
            color: "white",
            transition: "color 0.1s ease-in-out",
            "&:hover": {
                color: "yellow",
            },
        }} />
    </a>
</div>

                <p>Derechos reservados 2025 - GymManager S&P SOFT SOLUTION</p>
            </div>
        </footer>
    );
}

export default Footer;