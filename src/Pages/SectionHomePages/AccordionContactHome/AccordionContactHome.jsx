import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import style from "./AccordionContactHome.module.css";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

const MotionAccordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <motion.div 
      className={style.acordion}
      initial={false}
    >
      <motion.div 
        className={style.accordionHeader}
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '12px 16px',
          cursor: 'pointer',
          borderRadius: isOpen ? '4px 4px 0 0' : '4px'
        }}
      >
        <Typography sx={{fontWeight:"bold", color:"white"}} component="span">
          {title}
        </Typography>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ExpandMoreIcon sx={{color:"#FFDB00"}} />
        </motion.div>
      </motion.div>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '8px 16px 16px 16px' }}>
              <Typography sx={{color:"white"}}>
                {children}
              </Typography>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function AccordionTransition() {
  return (
    <div className={style.Accordion_container}>
      <h2>Preguntas Frecuentes</h2>
      <div className={style.accordion_content}>
        
        <MotionAccordion 
          title="¿Puedo pagar la membresía en efectivo o solo con tarjeta?"
        >
          💬 Aceptamos pagos en efectivo, tarjeta de crédito/débito y transferencias bancarias. También contamos con opciones de pago mensual o anual.
        </MotionAccordion>
        
        <MotionAccordion 
          title="¿Ofrecen entrenamientos personalizados?"
        >
          Sí, contamos con entrenadores personales que te ayudarán a alcanzar tus objetivos. Pregunta en recepción para más información.
        </MotionAccordion>
        
        <MotionAccordion 
          title="¿Puedo probar el gimnasio antes de inscribirme?"
        >
          ¡Sí! Ofrecemos un pase gratuito de 1 día para que pruebes nuestras instalaciones. Solo necesitas registrarte en la recepción.
        </MotionAccordion>
        
        <MotionAccordion 
          title="¿Cuál es el horario del gimnasio?"
        >
          💬 Nuestro gimnasio está abierto de lunes a sábado de 5:00 AM a 10:00 PM y los domingos de 7:00 AM a 5:00 PM
        </MotionAccordion>
        
      </div>
    </div>
  );
}