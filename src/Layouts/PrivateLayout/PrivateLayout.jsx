import React from 'react';
import SideBar from '../../Components/SideBar/SideBar';
import { Outlet } from 'react-router-dom';

import style from './privateLayout.module.css'

const PrivateLayout = () => {
    return (
        <div className={style.privateLayout_container}>
          <div className={style.privateLayout_sidebar}>
          <SideBar></SideBar>
          </div>

          <div className={style.privateLayout_main}>
            <Outlet></Outlet>
          </div>
        </div>
    );
};

export default PrivateLayout;