import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../Components/HeaderComponent/Header';
import Footer from '../../Components/FooterComponent/Footer';
import style from "./PublicLayout.module.css"
import { useLocation } from 'react-router-dom';

function PublicLayout() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
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