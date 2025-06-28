import React from 'react';
import { Box, Typography, Grid, useTheme, } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import WhyChooseUs from './WhyChooseUs'; // adapt import

const AboutUsHome = () => {
    const theme = useTheme();
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

    return (
        <Box id="aboutUs" sx={{ width: '100%', backgroundColor: 'background.paper'}}>
            {/* About Us Section */}
            <Box
                ref={ref}
                component={motion.div}
                initial={{}}
                animate={{}}
                sx={{
                    width: '100%',
                    height: { xs: 'auto', md: '80vh' },
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: { xs: 2, md: 12 },
                    py: { xs: 4, md: 0 },
                    backgroundColor: 'background.default',
                     borderRadius:"60px 60px 0px 0px " 
                }}
            >
                {/* Text */}
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
                    transition={{ duration: 0.5 }}
                    sx={{
                        width: { xs: '80%', md: '50%' },
                        height: { md: '70%' },
                        p: { xs: 2, md: 3 },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'start',
                        alignItems: 'start',
                        mx: { xs: 0, md: 2 },
                        borderRadius: '0px 100px 0px 100px',
                        backgroundColor: 'background.paper',
                        border: `1px solid ${theme.palette.primary.main}`,
                    }}
                >
                    <Typography variant="h4" sx={{ color: 'text.primary', pt: 1 }}>
                        Sobre Nosotros
                    </Typography>
                    <Typography sx={{ color: theme.palette.primary.main, pt: 2 }}>
                        Centro fitness y deportivo
                    </Typography>
                    <Typography sx={{ color: 'text.primary', pt: 2, pb: 1 }}>
                        En VALHALLA GYM, con más de 10 años de experiencia, ofrecemos 1,500 m² de instalaciones modernas con equipos de última generación. ¡Tra comunidad y transforma tu bienestar!
                    </Typography>
                </Box>

                {/* Image Placeholder */}
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
                    transition={{ duration: 0.7 }}
                    sx={{
                        width: { xs: '80%', md: '50%' },
                        height: { md: '70%', xs: 300 },
                        mx: { xs: 0, md: 2 },
                        borderRadius: '0px 100px 0px 100px',
                        backgroundImage: `url('https://www.shutterstock.com/image-photo/group-young-friends-doing-sports-260nw-2187770755.jpg')`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                    }}
                />
            </Box>

            {/* Why Choose Us section */}
            <WhyChooseUs />

            {/* Statistics summary of the busness */}
            <Box
                sx={{
                    width: '100%',
                    backgroundColor: 'background.paper',
                    py: 4,
                    px: { xs: 2, md: 12 },
                    mt:"50px",
                    pb:"100px"
                   
                }}
            >
                <Grid container spacing={2} justifyContent="center">
                    {[
                        { value: '300+', label: 'Miembros activos' },
                        { value: '5+', label: 'Años en el mercado' },
                        { value: '7', label: 'Días de la semana' },
                        { value: '3+', label: 'Tipos de membresías' },
                    ].map((stat, i) => (
                        <Grid item xs={6} md={3} key={i}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography sx={{ fontSize: '1.3rem', fontWeight: 700, color: 'text.secondary' }}>
                                    {stat.value}
                                </Typography>
                                <Typography sx={{ color: 'text.primary', opacity: "0.50" }}>
                                    {stat.label}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default AboutUsHome;
