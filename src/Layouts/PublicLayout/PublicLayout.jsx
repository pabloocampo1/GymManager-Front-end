import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from '../../Components/HeaderComponent/Header';
import Footer from '../../Components/FooterComponent/Footer';

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
    <Box sx={{width:"100%", minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor:"red" }}>
      <Header />
      <Box component="main" sx={{  pt: '9vh', backgroundColor: 'background.default' }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default PublicLayout;