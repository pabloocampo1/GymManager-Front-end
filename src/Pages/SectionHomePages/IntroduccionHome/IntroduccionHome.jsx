import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, styled, keyframes } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';


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



export default function IntroduccionHome() {
  
    const fullText = 'VALLHALLA\nGYM.';
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
        <>
            
        <Box
            sx={{
                position: 'absolute',
                top: "0",
                left: 0,
                width: '100%',
                height: '109vh',
                bgcolor: 'rgba(0, 0, 0, 0.7)', 
                zIndex: 1,
            }}
        />
        
            <Box
                id="home"
                sx={{
                    position: 'relative', 
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundImage: `url(${imagen2})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    px: { xs: 2, md: 12 },
                    flexDirection: { xs: 'column', md: 'row' },
                    mb: { xs: 12, md: 0 },
                }}
            >
               
                <Box
                    sx={{
                         zIndex: 2,
                        width: { xs: '80%', md: '50%' },
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: "start",
                        pl: "30px"
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontFamily: 'Big Shoulders Stencil, sans-serif',
                            fontSize: '1.3rem',
                            pb: 0,
                            color: "primary.main"
                        }}
                    >
                        El salon de los dioses¡
                    </Typography>
                    <Typography
                        component="h1"
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '3rem',
                            pt: 0,
                            pb: 1,
                        }}
                    >
                        <Typewriter sx={{color:"white"}}>
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
                            pt: 2,
                            pb: 1,
                            color:"white",
                            opacity:"0.70"
                        }}
                    >
                        Transforma tu cuerpo y fortalece tu mente. <br />
                        Da el primer paso hacia una versión más fuerte y saludable de ti mismo. <br />
                        ¡Únete a nuestra comunidad fitness y vive la experiencia VALLHALLA!
                    </Typography>
                    <Button
                        component={RouterLink}
                        to="#contact"
                        variant="outlined"
                        sx={{
                            width: 120,
                            height: 40,
                            mt: 4,
                            borderColor: "text.secondary",
                            borderRadius: 2,

                            color: "text.secondary",
                            '&:hover': {
                                borderWidth: 2,
                                backgroundColor: 'rgba(242, 242, 241,)',
                            },
                        }}
                    >
                        Contactanos
                    </Button>
                </Box>

                
                <Box
                    sx={{
                         zIndex: 2,
                        width: { xs: '80%', md: '50%' },
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}
                >
                    <Box sx={{
                        width: "80%", height: "80%", backgroundImage: `url(${imagen3})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        borderRadius: "30px"
                    }}>

                    </Box>
                </Box>
            </Box>
        </>


    );
}

