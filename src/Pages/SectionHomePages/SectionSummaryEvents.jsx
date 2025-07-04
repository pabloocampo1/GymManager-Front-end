import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import image from "../../assets/images/imageSectionEventSummary.png"
import { motion } from "framer-motion";

const SectionSummaryEvents = () => {
    const navigate = useNavigate()

    return (
        <Box sx={{
            width: "100%", height: {xs:"130vh", md:"100vh"}, bgcolor: "background.default", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: { xs: "column", md: "row" }, px: { xs: 2, md: 12 }, mb: { xs: 12, md: 0 },
        }}>
            <Box sx={{ width: "50%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>

                <motion.img
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9 }}
                    viewport={{ once: true }}
                    width={"80%"}
                    style={{ borderRadius: "20px" }}
                    src={image}
                    alt="image eventos"
                />
            </Box>
            <Box sx={{ width: { xs: '80%', md: '50%' }, height: "100%", display: "flex", justifyContent: "center", flexDirection: "column",p:{xs:"0px", lg:"60px"}  }}>
                <Typography variant='h3' sx={{ fontWeight: "bold" }}>Eventos destacados</Typography>
                <Typography variant='h4' sx={{ color: "text.primary", opacity: "0.70", pb: "40px" }}>Explora nuestras actividades recientes</Typography>
                <Typography sx={{ opacity: "0.50" }}>
                    Consulta los próximos eventos, actividades especiales y talleres disponibles. Haz clic en el botón para ver el listado completo y mantenerte siempre informado sobre nuestras novedades.
                </Typography>

                <Button
                    onClick={() => navigate("/eventsHome#events")}
                    variant="outlined"
                    sx={{
                        width: "100%",
                        height: 40,
                        mt: 4,
                        borderColor: "text.primary",
                        borderRadius: 2,

                        color: "text.primary",
                        '&:hover': {
                            borderWidth: 2,

                        },
                    }}
                >
                    Ver eventos
                </Button>
            </Box>
        </Box>
    );
};

export default SectionSummaryEvents;
