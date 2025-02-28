import React from 'react';
import style from './SideBar.module.css'
import { Link } from 'react-router-dom';

import imageLogo from '../../assets/images/logoprincipal.png'
import homeLogo from '../../assets/icons/round.png'
import { Button } from '@mui/material';



function SideBar() {
    return (
        <div className={style.container_sideBar}>

            <div className={style.imageContainer}>
                <img src={imageLogo} alt="logo gymManager" />
            </div>

            <div className={style.navegationList}>
                <div>
                    <img src={homeLogo} alt="home logo" />
                    <Link to="/dashboard">inicio</Link>
                </div>

                <div>
                    <Link to="membresias">memebresias</Link>
                </div>

                <div>
                    <Link to="user">eventos</Link>
                    <Button variant="outlined">Outlined</Button>
                    
                </div>
            </div>

            <div className={style.UtilsSideBar}>
                <ol>
                <Link to="/login">Salir</Link>
                    <li>configuracion</li>
                </ol>
            </div>
        </div>
    );
}

export default SideBar;