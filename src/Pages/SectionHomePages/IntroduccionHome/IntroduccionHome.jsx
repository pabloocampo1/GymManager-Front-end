import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, styled, keyframes, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';

import imagen1 from '../../../assets/images/imagenValHallaSlider1.png';
import imagen2 from '../../../assets/images/imagenValHallaSlider2.png';
import imagen3 from '../../../assets/images/imagenValHallaSlider3.png';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const Typewriter = styled('span')({
    display: 'inline-block',
    whiteSpace: 'pre',
});

const Cursor = styled('span')(({ theme }) => ({
    display: 'inline-block',
    width: '1px',
    height: '1em',
    backgroundColor: '#fff',
    marginLeft: theme.spacing(0.5),
    verticalAlign: 'bottom',
    animation: `${blink} 0.7s steps(1) infinite`,
}));

const sliderDuration = 10;

export default function IntroduccionHome() {
    const theme = useTheme();
    const images = [imagen1, imagen2, imagen3];
    const fullText = 'El SALON DE LOS\nDIOSES';
    const [typedText, setTypedText] = useState('');

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setTypedText(fullText.slice(0, i + 1));
            i++;
            if (i >= fullText.length) clearInterval(interval);
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <Box
            id="home"
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'background.paper',
                px: { xs: 2, md: 12 },
                flexDirection: { xs: 'column', md: 'row' },
                mb: { xs: 12, md: 0 },
            }}
        >
            {/* Left Info */}
            <Box
                sx={{
                    width: { xs: '80%', md: '50%' },
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontFamily: 'Big Shoulders Stencil, sans-serif',
                        fontSize: '1.3rem',
                        pb: 0.5,
                        color: "primary.main"
                    }}
                >
                    VALLHALLA GYM
                </Typography>
                <Typography
                    component="h1"
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '3rem',
                        pt: 1,
                        pb: 0.5,
                    }}
                >
                    <Typewriter>
                        {typedText.split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                                {line}
                                {i < typedText.split('\n').length - 1 && <br />}
                            </React.Fragment>
                        ))}
                        <Cursor />
                    </Typewriter>
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        fontSize: '1rem',
                        pt: 0.5,
                        pb: 1,
                    }}
                >
                    Transforma tu cuerpo, transforma tu <br /> vida. ¡Únete a nuestra comunidad <br /> fitness!
                </Typography>
                <Button
                    component={RouterLink}
                    to="contact#contact"
                    variant="outlined"
                    sx={{
                        width: 120,
                        height: 40,
                        mt: 4,
                        borderColor: theme.palette.primary.main,
                        borderRadius: 2,
                        backgroundColor: '#000',

                        '&:hover': {
                            borderWidth: 2,
                            backgroundColor: 'rgba(255, 219, 0, 0.5)',
                        },
                    }}
                >
                    Contactanos
                </Button>
            </Box>

            {/* Right Slider */}
            <Box
                sx={{
                    width: { xs: '80%', md: '50%' },
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <motion.div
                    style={{ display: 'flex', borderRadius: '50%', height: '70%', width: `calc(70% * 4)`, gap: '20px' }}
                    animate={{ x: ['0%', '-100%'] }}
                    transition={{ repeat: Infinity, duration: sliderDuration, ease: 'linear' }}
                >
                    {images.concat(images).map((img, index) => (
                        <Box
                            component="img"
                            key={index}
                            src={img}
                            alt={`slide-${index}`}
                            sx={{ height: '100%', flexShrink: 0 }}
                        />
                    ))}
                </motion.div>
            </Box>
        </Box>
    );
}
