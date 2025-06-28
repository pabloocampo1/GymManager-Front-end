import * as React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MotionAccordion = ({ title, children }) => {
    const [expanded, setExpanded] = React.useState(false);

    return (
        <motion.div
            initial={false}
            animate={{ opacity: expanded ? 1 : 0.9, scale: expanded ? 1.02 : 1 }}
            transition={{ duration: 0.3 }}
            style={{ marginBottom: '20px' }}
        >
            <Accordion
                expanded={expanded}
                onChange={() => setExpanded(!expanded)}
                sx={{
                    backdropFilter: 'blur(5px)',
                    borderRadius: '10px !important',
                    backgroundColor: 'background.default',
                    color: 'text.primary',
                    '& .MuiAccordionSummary-root': {
                        borderRadius: expanded ? '10px 10px 0 0' : '10px',
                    },
                    '& .MuiAccordionDetails-root': {
                        backgroundColor: 'background.default',
                        borderRadius: '0 0 10px 10px',
                    }
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: 'text.primary' }} />}
                >
                    <Typography fontWeight="bold">{title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>{children}</Typography>
                </AccordionDetails>
            </Accordion>
        </motion.div>
    );
};

export default function AccordionTransition() {
    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '100vh',
                padding: { xs: '0 10px', sm: '0 30px', md: '0 50px', lg: '0 100px' },
                paddingBottom: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: 'background.default',
                zIndex: 1
            }}
        >
            <Typography variant="h4" color="primary.main" mb={3}>
                Preguntas Frecuentes
            </Typography>

            <Box sx={{ width: { xs: '100%', sm: '90%', md: '80%', lg: '70%' } }}>
                <MotionAccordion title="¿Puedo pagar la membresía en efectivo o solo con tarjeta?">
                    💬 Aceptamos pagos en efectivo, tarjeta de crédito/débito y transferencias bancarias. También contamos con opciones de pago mensual o anual.
                </MotionAccordion>

                <MotionAccordion title="¿Ofrecen entrenamientos personalizados?">
                    Sí, contamos con entrenadores personales que te ayudarán a alcanzar tus objetivos. Pregunta en recepción para más información.
                </MotionAccordion>

                <MotionAccordion title="¿Puedo probar el gimnasio antes de inscribirme?">
                    ¡Sí! Ofrecemos un pase gratuito de 1 día para que pruebes nuestras instalaciones. Solo necesitas registrarte en la recepción.
                </MotionAccordion>

                <MotionAccordion title="¿Cuál es el horario del gimnasio?">
                    💬 Nuestro gimnasio está abierto de lunes a sábado de 5:00 AM a 10:00 PM y los domingos de 7:00 AM a 5:00 PM
                </MotionAccordion>
            </Box>
        </Box>
    );
}
