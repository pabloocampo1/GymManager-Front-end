import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { api } from '../../Service/api';
import { motion } from "framer-motion";

const StateSuscriptionSection = () => {

    const [dni, setDni] = useState("");
    const [result, setResult] = useState("");
    const [isLoanding, setIsLoanding] = useState(false);

    const handleDni = (event) => {
        setDni(event.target.value)
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoanding(true)

        try {
            const response = await api.get(`/api/subscription/request/status/subscription/${dni}`);
            console.log(response);

            if (response.status !== 200) {
                setIsLoanding(false)
                setResult("No eres Miembro registrado, si quieres unirte a nuestra comunidad ve a nuestras locales o contáctanos.");
                return;
            }

            const stateSubscription = response.data.statusSubscription;

            if (stateSubscription) {
                setResult(`✅ ¡Todo en orden! Tu suscripción está activa hasta el ${formatDate(response.data.endMembership)}.`);
            } else {
                setResult(`⚠️ Tu suscripción está inactiva. Por favor acércate a recepción para renovarla.`);
            }

        } catch (error) {
            setResult("No eres Miembro registrado, si quieres unirte a nuestra comunidad ve a nuestras locales o contáctanos.");
            console.error(error);
        }

        setDni("");
        setIsLoanding(false);
    }

    return (
        <Box sx={{
            width: "100%",
            height: { xs: "130vh", md: "100vh" },
            backgroundColor: "background.paper",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
            p: { xs: 2, md: 12 },
            mb: { xs: 12, md: 0 },
        }}>

            <Box sx={{ width: { xs: '80%', md: '50%' }, height: "100%", display: "flex", justifyContent: "center", flexDirection: "column",  p:{xs:"0px", lg:"60px"} }}>
                <Typography variant='h3' sx={{ fontWeight: "bold", pt:{xs:"60px", mb:"0px"} }}>Consulta el estado de tu suscripción</Typography>
                <Typography variant='h4' sx={{ color: "text.primary", pb: "20px", opacity: "0.70" }}>Mantente al día con tu membresía</Typography>
                <Typography sx={{ opacity: "0.50" }}>Ingresa tu número de documento para conocer la vigencia de tu suscripción, tus fechas de pago y el estado actual de tu membresía. ¡Mantente siempre al día y no pierdas acceso a nuestros servicios!</Typography>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column"
                }} component="form" onSubmit={handleSubmit}>
                    <TextField sx={{ width: "200px", mt: "20px" }} id="outlined-basic_dni" label="Cédula" variant="outlined" placeholder='Cédula' value={dni} onChange={handleDni} required />
                    <Button type='submit' variant='outlined' sx={{
                        width: "100%",
                        height: 40,
                        mt: 4,
                        borderColor: "text.primary",
                        borderRadius: 2,
                        color: "text.primary",
                        '&:hover': {
                            borderWidth: 2,
                        },
                    }}>Consultar estado</Button>
                </Box>
                <Box>
                    <Typography sx={{ pt: "20px" }}>{isLoanding ? "Cargando información..." : result}</Typography>
                </Box>
            </Box>

            <Box sx={{ width: "50%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <motion.img
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9 }}
                    viewport={{ once: true }}
                    width={"80%"}
                    style={{ borderRadius: "20px" }}
                    src="https://tse4.mm.bing.net/th/id/OIP.VZyk-DpNFEbpEho0OwGe-wHaE7?rs=1&pid=ImgDetMain&o=7&rm=3"
                    alt="imagesusbcsripction"
                />
            </Box>

        </Box>
    );
};

export default StateSuscriptionSection;
