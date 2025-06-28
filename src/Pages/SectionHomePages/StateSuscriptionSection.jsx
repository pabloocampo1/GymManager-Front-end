import { Box, Button, Input, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { api } from '../../Service/api';

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
            
            if(response.status !== 200){
                setIsLoanding(false)
                 setResult("No eres Miembro registrado, si quieres unirte a nuestra comunidad ve a nuestras locales o contactanos.")
                 return;
            }

            const stateSubscription = response.data.statusSubscription;
            
            
            if (stateSubscription) {
                setResult(`✅ ¡Todo en orden!. Tu suscripción está activa hasta el ${formatDate(response.data.endMembership)} .`)
            } else {
                setResult(`⚠️ Tu suscripción está inactiva.
                                Por favor acércate a recepción para renovarla.`)
            }

        } catch (error) {
           
            setResult("No eres Miembro registrado, si quieres unirte a nuestra comunidad ve a nuestras locales o contactanos.")
            console.error(error);
            

        }
        
        setDni("")
        setIsLoanding(false)

    }

    return (
        <Box sx={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "background.paper",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>

            <Box sx={{ width: "50%", height: "100%", display: "flex", justifyContent: "center", flexDirection: "column", px: { xs: 2, md: 12 }, }}>
                <Typography variant='h3'>Consulta el estado de tu suscripción</Typography>
                <Typography variant='h4' sx={{ color: "text.secondary", pb: "20px" }}>Mantente al día con tu membresía</Typography>
                <Typography sx={{ opacity: "0.50" }}>Ingresa tu número de documento para conocer la vigencia de tu suscripción, tus fechas de pago y el estado actual de tu membresía. ¡Mantente siempre al día y no pierdas acceso a nuestros servicios!</Typography>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column"
                }} component="form" onSubmit={handleSubmit}>
                    <TextField sx={{ width: "200px", mt: "20px" }} id="outlined-basic_dni" label="Cedula" variant="outlined" placeholder='Cedula ' value={dni} onChange={handleDni} required />
                    <Button type='submit' variant='outlined' sx={{ borderColor: "#2A8A7A", color: "text.primary", mt: "30px" }}>Consultar estado</Button>

                </Box>
                <Box>
                    <Typography sx={{pt:"20px"}}>{isLoanding ? "Cargando  informacion..." : result}</Typography>
                </Box>
            </Box>
            <Box sx={{ width: "50%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img width={"80%"} style={{ borderRadius: "20px" }} src="https://tse4.mm.bing.net/th/id/OIP.VZyk-DpNFEbpEho0OwGe-wHaE7?rs=1&pid=ImgDetMain&o=7&rm=3" alt="imagesusbcsripction" />
            </Box>

        </Box>
    );
};

export default StateSuscriptionSection;