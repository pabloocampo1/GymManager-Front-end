import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../Components/HeaderComponent/Header';
import Footer from '../../Components/FooterComponent/Footer';

function PublicLayout() {
    return (
        <div>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    );
}

export default PublicLayout;