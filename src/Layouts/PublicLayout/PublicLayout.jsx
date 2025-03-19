import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../Components/HeaderComponent/Header';
import Footer from '../../Components/FooterComponent/Footer';
import style from "./PublicLayout.module.css"

function PublicLayout() {
    return (
        <div className={style.container_layout_public}>
        <Header />
        <main className={style.main}>
          <Outlet />
        </main>
        <Footer />
      </div>
    );
}

export default PublicLayout;