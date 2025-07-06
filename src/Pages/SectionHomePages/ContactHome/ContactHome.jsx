import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    Link,
    Paper,
} from '@mui/material';
import { LocalPhone, Email, LocationOn, AccessTimeFilled, Facebook, Instagram, WhatsApp, Send } from '@mui/icons-material';
import ReCAPTCHA from "react-google-recaptcha";
import MapLocation from "../../../Components/MapLocation";

import AccordionTransition from '../AccordionContactHome/AccordionContactHome';
import { sendContactEmail } from '../../../Service/HomeEmailService';

const ContactHome = () => {
    const [captchaToken, setCaptchaToken] = useState(null);
    
    const onChange = (token) => {
        setCaptchaToken(token);
    }

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
         
            if (!formData.name || !formData.email || !formData.message) {
                throw new Error("Por favor completa todos los campos");
            }
            
           
            if (!captchaToken) {
                throw new Error("Por favor verifica que no eres un robot");
            }

          
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) throw new Error("Por favor ingresa un correo electrónico válido");

            await sendContactEmail({ ...formData, captchaToken });
            alert("Mensaje enviado con éxito");
            setFormData({ name: '', email: '', message: '' });
            alert("Mensaje enviado con éxito");
        } catch (error) {
            alert(error.message || "Hubo un error al enviar el mensaje");
            setError(error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box id="contact" sx={{ width: '100%', backgroundColor: 'background.paper', borderRadius:"80px 80px 0px 0px " , padding: { xs: '10px 20px', md: '100px' }, mt:"60px", }}>
            <Box display="flex" flexWrap="wrap" justifyContent="center" gap={5}>
                {/* Contact Details */}
                <Box sx={{ width: { xs: '100%', md: '60%' },  border:"1px solid rgb(72, 72, 72)", backgroundColor:"" }}>
                    <Typography variant="h4" color="text.primary" textAlign="center" mb={3} mt={4}>Nuestros detalles de contacto</Typography>
                    <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" sx={{ m: "20px" }} gap={1}>
                        {[
                            { icon: <LocalPhone fontSize='large' sx={{ color: '#FFDB00' }} />, title: 'Teléfonos de contacto', details: ['314 4201205', '320 4040869'] },
                            { icon: <Email fontSize='large' sx={{  color: '#FFDB00' }} />, title: 'Correos de Contacto', details: ['pablampo@gmail.com', 'mateocarna@gmail.com'] },
                            { icon: <LocationOn fontSize='large' sx={{  color: '#FFDB00' }} />, title: 'Lugar de residencia', details: ['Carrera 49 #12-15'] },
                            { icon: <AccessTimeFilled fontSize='large' sx={{  color: '#FFDB00' }} />, title: 'Horarios', details: ['Lunes - Viernes : 5am/10pm', 'Sábados, Domingos y Festivos : 7am/12pm'] },
                        ].map((item, index) => (
                            <Box key={index}  sx={{ display: 'flex', padding: 2, borderRadius: 2, border: '1px solid #FFDB00', backgroundColor: 'background.paper' }}>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mr: "20px" }}  >{item.icon}</Box>
                                <Box>
                                    <Typography variant="h6" color="text.primary">{item.title}</Typography>
                                    <List dense>
                                        {item.details.map((detail, idx) => (
                                            <ListItem key={idx} disableGutters sx={{ color: 'text.primary',  opacity:"0.50", pl: 0 }}>{detail}</ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    <Box sx={{ m: "20px" }}>
                        <MapLocation />
                    </Box>
                </Box>

                {/* Contact Form */}
                <Box sx={{ width: { xs: '100%', md: '35%' }, display: 'flex', justifyContent: 'center', }}>
                    <Box
                        sx={{
                            width: '100%',
                            padding: 4,
                          border:"1px solid rgb(72, 72, 72)" ,
                            borderRadius: 2,
                          
                        }}
                    >
                        <Typography variant="h4" color="text.primary" textAlign="center" mb={3}>Envíanos un mensaje</Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Nombre"
                                variant="standard"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                fullWidth
                                required
                                sx={{
                                    mb: 2,
                                    input: { color: 'text.primary' },
                                    label: { color: 'text.primary' },
                                    '& .MuiInput-underline:before': { borderBottomColor: 'text.primary' },
                                    '& .MuiInput-underline:hover:before': { borderBottomColor: '#FFDB00' },
                                    '& .MuiInput-underline:after': { borderBottomColor: '#FFDB00' }
                                }}
                            />
                            <TextField
                                label="Correo"
                                variant="standard"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                fullWidth
                                required
                                sx={{
                                    mb: 2,
                                    input: {color: 'text.primary' },
                                    label: {color: 'text.primary' },
                                    '& .MuiInput-underline:before': { borderBottomColor: 'text.primary' },
                                    '& .MuiInput-underline:hover:before': { borderBottomColor: '#FFDB00' },
                                    '& .MuiInput-underline:after': { borderBottomColor: '#FFDB00' }
                                }}
                            />
                            <Typography variant="body1" color="text.primary" mb={1}>Mensaje</Typography>
                            <TextField
                                name="message"
                                placeholder="Escribe tu mensaje"
                                multiline
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                fullWidth
                                required
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: 'text.primary' },
                                        '&:hover fieldset': { borderColor: '#FFDB00' },
                                        '&.Mui-focused fieldset': { borderColor: '#FFDB00' },
                                    },
                                    textarea: { color:"text.primary" }
                                }}
                            />
                            <ReCAPTCHA sitekey="6LfArTArAAAAAPxWG4v5Z6ktodfQzQN42wdFm_My" onChange={onChange} />
                            <Button
                                variant="contained"
                                endIcon={<Send />}
                                type="submit"
                                disabled={loading}
                                fullWidth
                                sx={{ mt: 3, backgroundColor: '#FFDB00', color: 'black', fontWeight: 'bold' }}
                            >
                                {loading ? "Enviando..." : "Enviar"}
                            </Button>
                            {error && (
                                <Typography color="error" mt={2}>{error}</Typography>
                            )}
                        </form>

                        {/* Redes sociales */}
                        <Box mt={4}>
                            <Typography color="text.primary" mb={1}>Redes sociales:</Typography>
                            <Box display="flex" alignItems="center">
                                <Link href="https://www.facebook.com/valhallagymoficial?locale=es_LA" target="_blank" rel="noopener noreferrer" color="inherit" sx={{ mr: 2 }}>
                                    <Facebook />
                                </Link>
                                <Link href="https://www.instagram.com/valhalla__gym?igsh=a3lhbGJnbHpmNzNx" target="_blank" rel="noopener noreferrer" color="inherit" sx={{ mr: 2 }}>
                                    <Instagram />
                                </Link>
                                <WhatsApp />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <AccordionTransition />
        </Box>
    );
};

export default ContactHome;
