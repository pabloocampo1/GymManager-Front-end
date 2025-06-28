import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Grid, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import VanillaTilt from 'vanilla-tilt';
import MembresiaService from '../../../Service/MembresiaService';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PriceMembershipHome = () => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
    const tiltRefs = useRef([]);
    const [membresias, setMembresias] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarMembresias = async () => {
            try {
                setIsLoading(false);
                setError(null);
                const data = await MembresiaService.getAllMembresiaPublic();
                if (Array.isArray(data)) {
                    setMembresias(data);
                } else {
                    setError('No se pudieron cargar las membresías');
                }
            } catch (error) {
                console.error('Error al cargar las membresías:', error);
                setError('Error al cargar las membresías. Por favor, intente más tarde.');
            } finally {
                setIsLoading(false);
            }
        };

        cargarMembresias();
    }, []);

    useEffect(() => {
        if (!isLoading && membresias.length > 0) {
            tiltRefs.current.forEach((el) => {
                if (el) {
                    VanillaTilt.init(el, {
                        max: 15,
                        speed: 400,
                        glare: true,
                        'max-glare': 0.3,
                    });
                }
            });
        }
    }, [isLoading, membresias]);

    const getBorderTop = (type) => {
        switch (type.toLowerCase()) {
            case 'oro':
                return '5px solid #FFD700';
            case 'plata':
                return '5px solid #C0C0C0';
            case 'bronce':
                return '5px solid #CD7F32';
            default:
                return '5px solid var(--primary-color)';
        }
    };

    if (isLoading) {
        return (
            <Box id="price" sx={{ width: '100%', minHeight: '100vh', backgroundColor: 'background.default', px: { xs: '20px', md: '100px' }, py: 5 }}>
                <Typography variant="h4" textAlign="center" sx={{ color:"text.primary", pt: 10, pb: 5 }}>Cargando membresías...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box id="price" sx={{ width: '100%', minHeight: '100vh', backgroundColor: 'background.default', px: { xs: '20px', md: '100px' }, py: 5 }}>
                <Typography variant="h4" textAlign="center" sx={{ color:"text.primary", pt: 10, pb: 5 }}>Nuestros Precios</Typography>
                <Typography textAlign="center" sx={{ color: 'var(--textSecond-color)', fontSize: '1.1rem', mt: 2 }}>{error}</Typography>
            </Box>
        );
    }

    if (!membresias || membresias.length === 0) {
        return (
            <Box id="price" sx={{ width: '100%', minHeight: '100vh', backgroundColor: 'background.default', px: { xs: '20px', md: '100px' }, py: 5 }}>
                <Typography variant="h4" textAlign="center" sx={{ color:"text.primary", pt: 10, pb: 5 }}>Nuestros Precios</Typography>
                <Typography textAlign="center" sx={{ color: 'var(--textSecond-color)', fontSize: '1.1rem', mt: 2 }}>No hay membresías disponibles en este momento.</Typography>
            </Box>
        );
    }

    return (
        <Box id="price" sx={{ width: '100%', minHeight: '100vh', backgroundColor: 'background.default',  borderRadius:"30px 30px 0px 0px " , px: { xs: '20px', md: '100px' }, py: 5 }}>
            <Typography variant="h4" textAlign="center" sx={{ color:"text.primary", pt: 10, pb: 5, fontWeight: 'bold' }}>Nuestros Precios</Typography>

            <Grid container spacing={3} ref={ref}>
                {membresias.map((membresia, index) => (
                    <Grid item xs={12} sm={6} md={3} key={membresia.id}>
                        <Box
                            ref={(el) => (tiltRefs.current[index] = el)}
                            component={motion.div}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : index % 2 === 0 ? -50 : 50 }}
                            transition={{ duration: 1 }}
                            sx={{
                                // width:"300px",
                                borderRadius: '20px',
                                border: '0.5px solid #9b9b9b',
                                borderTop: getBorderTop(membresia.type),
                                minHeight: '300px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                bgcolor: 'background.default',
                                transition: 'transform 0.3s ease',
                                '&:hover': { transform: 'translateY(-5px)' },
                                p: 2,
                            }}
                        >
                            <Box>
                                <Typography variant="h6" sx={{ color: 'var(--textSecond-color)', pt: 2, pb: 1, fontSize: '1rem' }}>
                                    {membresia.title}
                                </Typography>

                                <Typography variant="h4" sx={{ color:"text.primary", fontWeight: 'bold', pb: 5, fontSize: '1.9rem' }}>
                                    <span style={{ color: 'var(--textSecond-color)', fontSize: '0.9rem' }}>$</span>{membresia.price.toLocaleString()}
                                    <span style={{ color: 'var(--textSecond-color)', fontSize: '0.9rem' }}> / {membresia.duration} días</span>
                                </Typography>

                                <List dense>
                                    {membresia.benefits && membresia.benefits.map((benefit, idx) => (
                                        <ListItem key={idx} sx={{ color: 'var(--textSecond-color)', fontSize: '0.9rem', pl: 0 }}>
                                            <ListItemIcon sx={{ minWidth: '30px' }}>
                                                <CheckCircleIcon sx={{ color: 'var(--primary-color)' }} />
                                            </ListItemIcon>
                                            <ListItemText primary={benefit} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>

                            {/* <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: 'var(--primary-color)',
                                    color: 'black',
                                    padding: '0.8rem 1.5rem',
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    mt: 3,
                                    mb: 2,
                                    width: '80%',
                                    '&:hover': { backgroundColor: 'var(--primarySecond-color)' },
                                }}
                            >
                                Suscribirme
                            </Button> */}
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default PriceMembershipHome;
