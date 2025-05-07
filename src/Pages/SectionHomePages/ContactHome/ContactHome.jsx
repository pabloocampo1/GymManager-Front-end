import React, { useState } from 'react';
import style from "./ContactHome.module.css";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { Box, Button, TextField } from '@mui/material';
import { Facebook, Instagram, Send, WhatsApp } from '@mui/icons-material';
import MapLocation from '../../../Components/MapLocation';
import AccordionTransition from '../AccordionContactHome/AccordionContactHome';
import { sendContactEmail } from '../../../Service/HomeEmailService';

const ContactHome = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Reiniciar mensajes cuando el usuario modifica el formulario
        setError(null);
        setSuccess(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            // Validar que todos los campos estén completos
            if (!formData.name || !formData.email || !formData.message) {
                throw new Error("Por favor completa todos los campos");
            }
            
            // Validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                throw new Error("Por favor ingresa un correo electrónico válido");
            }
            
            await sendContactEmail(formData);
            setSuccess(true);
            setFormData({ name: '', email: '', message: '' });
            alert("Mensaje enviado con éxito");
        } catch (error) {
            const errorMessage = error.message || "Hubo un error al enviar el mensaje";
            setError(errorMessage);
            alert(errorMessage);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id='contact' className={style.ContactHome_container}>
            <div className={style.container_intro_contact}>
                <h2>Contacto</h2>
                <p>¿Tienes alguna pregunta o necesitas más información? </p>
                <p>Estamos aquí para ayudarte. Contáctanos y con gusto responderemos a todas tus inquietudes.</p>
            </div>

            <div className={style.container_contact}>
                <div className={style.section_details}>
                    <div className={style.section_details_information}>
                        <h2>Nuestros detalles de contacto</h2>
                        <div className={style.information_items}>
                            <div className={style.information_items_item}>
                                <div className={style.logo_details}>
                                    <LocalPhoneIcon fontSize='large' sx={{ color: "white" }} />
                                </div>
                                <div className={style.details_about_contact} >
                                    <h3>Teléfonos de contacto</h3>
                                    <ol>
                                        <li>314 5755765</li>
                                        <li>320 4040869</li>
                                    </ol>
                                </div>
                            </div>
                            <div className={style.information_items_item}>
                                <div className={style.logo_details}>
                                    <EmailIcon fontSize='large' sx={{ color: "white" }} />
                                </div>
                                <div className={style.details_about_contact} >
                                    <h3>Correos de Contacto</h3>
                                    <ol>
                                        <li>pablampo@gmail.com</li>
                                        <li>mateocarna@gmail.com</li>
                                    </ol>
                                </div>
                            </div>
                            <div className={style.information_items_item}>
                                <div className={style.logo_details}>
                                    <LocationOnIcon fontSize='large' sx={{ color: "white" }} />
                                </div>
                                <div className={style.details_about_contact} >
                                    <h3>Lugar de residencia</h3>
                                    <ol>
                                        <li>Carrera 49 #12-15</li>
                                    </ol>
                                </div>
                            </div>
                            <div className={style.information_items_item}>
                                <div className={style.logo_details}>
                                    <AccessTimeFilledIcon fontSize='large' sx={{ color: "white" }} />
                                </div>
                                <div className={style.details_about_contact} >
                                    <h3>Horarios</h3>
                                    <ol>
                                        <li>Lunes - Viernes : 5am/10pm</li>
                                        <li>Sábados, Domingos y Festivos : 7am/12pm</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.section_details_map}>
                        <MapLocation />
                    </div>
                </div>

                <Box className={style.section_send_mesagge}>
                    <div className={style.container_form}>
                        <h2>Envíanos un mensaje</h2>
                        <div className={style.section_send_mesagge_items}>
                            <div className={style.send_mesagge_form_container}>
                                <form onSubmit={handleSubmit} className={style.formContainer}>
                                    <TextField
                                        label="Nombre"
                                        variant="standard"
                                        className={style.inputField}
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        sx={{
                                            width: "100%",
                                            paddingBottom: 2,
                                            input: { color: "white" },
                                            label: { color: "white" },
                                            "& .MuiInput-underline:before": { borderBottomColor: "white" },
                                            "& .MuiInput-underline:hover:before": { borderBottomColor: "#FFDB00" },
                                            "& .MuiInput-underline:after": { borderBottomColor: "#FFDB00" },
                                        }}
                                    />
                                    <TextField
                                        label="Correo"
                                        variant="standard"
                                        className={style.inputField}
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        sx={{
                                            width: "100%",
                                            paddingBottom: 5,
                                            input: { color: "white" },
                                            label: { color: "white" }, // Corregido: "white" en lugar de "#FFDB00"
                                            "& .MuiInput-underline:before": { borderBottomColor: "white" },
                                            "& .MuiInput-underline:hover:before": { borderBottomColor: "#FFDB00" },
                                            "& .MuiInput-underline:after": { borderBottomColor: "#FFDB00" },
                                        }}
                                    />
                                    <label htmlFor="message">Mensaje</label>
                                    <textarea
                                        name="message"
                                        placeholder="Escribe tu mensaje"
                                        id="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Button
                                        variant="contained"
                                        endIcon={<Send />}
                                        type="submit"
                                        disabled={loading}
                                        sx={{
                                            marginTop: 3,
                                            backgroundColor: "#FFDB00",
                                            color: "black"
                                        }}
                                    >
                                        {loading ? "Enviando..." : "Enviar"}
                                    </Button>
                                    
                                    {error && (
                                        <div style={{ color: 'red', marginTop: '10px' }}>
                                            {error}
                                        </div>
                                    )}
                                    
                                    
                                </form>
                            </div>
                            <div className={style.send_mesagge_socialMedia_container}>
                                <p>Redes sociales:</p>
                                <div>
                                    <a href="https://www.facebook.com/valhallagymoficial?locale=es_LA" target="_blank" rel="noopener noreferrer">
                                        <Facebook sx={{ marginRight: 1, marginLeft: 1 }} />
                                    </a>
                                    <a href="https://www.instagram.com/valhalla__gym?igsh=a3lhbGJnbHpmNzNx" target="_blank" rel="noopener noreferrer">
                                        <Instagram sx={{ marginRight: 1 }} />
                                    </a>
                                    <WhatsApp sx={{ marginRight: 1 }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </div>
            <AccordionTransition />
        </div>
    );
};

export default ContactHome;