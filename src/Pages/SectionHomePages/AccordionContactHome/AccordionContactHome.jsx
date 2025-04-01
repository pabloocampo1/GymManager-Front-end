import * as React from 'react';
import style from "./AccordionContactHome.module.css";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';

export default function AccordionTransition() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div className={style.Accordion_container}>
      <h2>Preguntas Frecuentes</h2>
      <div className={style.accordion_content}>

        <Accordion 
          expanded={expanded}
          onChange={handleExpansion}
          slots={{ transition: Fade }}
          className={style.acordion}
          slotProps={{ transition: { timeout: 400 } }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{color:"#FFDB00"}} />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography sx={{fontWeight:"bold", color:"white"}}  component="span">¿Puedo pagar la membresía en efectivo o solo con tarjeta?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{color:"white"}}>
            💬 Aceptamos pagos en efectivo, tarjeta de crédito/débito y transferencias bancarias. También contamos con opciones de pago mensual o anual.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className={style.acordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{color:"#FFDB00"}}   />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography sx={{fontWeight:"bold", color:"white"}} component="span" >¿Ofrecen entrenamientos personalizados?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{color:"white"}} >
              Sí, contamos con entrenadores personales que te ayudarán a alcanzar tus objetivos. Pregunta en recepción para más información.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className={style.acordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{color:"#FFDB00"}} />}  
            aria-controls="panel3-content"
            id="panel3-header"
          >
          <Typography sx={{fontWeight:"bold", color:"white"}} component="span" >¿Puedo probar el gimnasio antes de inscribirme?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{color:"white"}} >
            ¡Sí! Ofrecemos un pase gratuito de 1 día para que pruebes nuestras instalaciones. Solo necesitas registrarte en la recepción.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion className={style.acordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{color:"#FFDB00"}} />} 
            aria-controls="panel4-content"
            id="panel4-header"
          >
            <Typography sx={{fontWeight:"bold",color:"white"}} component="span" >¿Cuál es el horario del gimnasio?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{color:"white"}} >
            💬 Nuestro gimnasio está abierto de lunes a sábado de 5:00 AM a 10:00 PM y los domingos de 7:00 AM a 5:00 PM
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion className={style.acordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{color:"#FFDB00"}} />} 
            aria-controls="panel4-content"
            id="panel4-header"
          >
            <Typography sx={{fontWeight:"bold", color:"white"}} component="span" >¿Cuál es el horario del gimnasio?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{color:"white"}}>
            💬 Nuestro gimnasio está abierto de lunes a sábado de 5:00 AM a 10:00 PM y los domingos de 7:00 AM a 5:00 PM
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
