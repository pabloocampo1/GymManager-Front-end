import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';


import personalTrainerIcon from '../../../assets/icons/undraw_personal-trainer_bqkg.svg';
import machineIcon from '../../../assets/icons/undraw_activity-tracker_3o6r.svg';
import peopleIcon from '../../../assets/icons/undraw_people_ka7y.svg';

const WhyChooseUs = () => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

   
    const cards = [
        {
            title: 'Entrenadores Expertos',
            text: 'Contamos con un equipo de entrenadores altamente capacitados para ayudarte a alcanzar tus metas.',
            image: personalTrainerIcon,
        },
        {
            title: 'Equipamiento de Alta Calidad',
            text: 'Disponemos de los mejores equipos para que tu entrenamiento sea eficiente y seguro.',
            image: machineIcon,
        },
        {
            title: 'Comunidad Motivadora',
            text: 'Únete a una comunidad activa y comprometida que te apoyará en tu camino hacia el éxito.',
            image: peopleIcon,
        },
    ];

    return (
        <Box
            ref={ref}
            component="section"
            sx={{ width: '100%', py: 5, backgroundColor: 'background.paper', mt: 6 }}
        >
            <Typography variant="h4" sx={{ color: 'text.primary', fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
                ¿Por qué elegirnos?
            </Typography>
            <Grid container justifyContent="center" spacing={4} sx={{ px: { xs: 2, md: 12 } }}>
                {cards.map((card, i) => (
                    <Grid item xs={12} sm={6} md={4} key={i}>
                        <Box
                            component={motion.div}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
                            transition={{ duration: 0.6, delay: i * 0.3 }}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-evenly',
                                p: 3,
                                borderRadius: 2,
                                bgcolor: 'background.default',
                                textAlign: 'center',
                                minHeight: 300,
                            }}
                        >
                            <Box
                                component="img"
                                src={card.image}
                                alt={card.title}
                                sx={{ width: 100, height: 100, mb: 2 }}
                            />
                            <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 500, fontSize: 25, mt: 2 }}>
                                {card.title}
                            </Typography>
                            <Typography sx={{ color: 'text.primary', opacity: "0.50", fontSize: '0.875rem', mt: 1 }}>
                                {card.text}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default WhyChooseUs;
