import React from 'react';
import WhyChooseUs from './WhyChooseUs';
import style from "../AboutUsHome/AboutUsHome.module.css";

function AboutUsHome() {
    return (
        <div className={style.aboutUs_container}>
            <div className={style.aboutUs_section}>
                <div className={style.aboutUs_section_text}>
                    
                    <span>Centro fitnness y deportivo</span>
                    <h2>Creemos que el esfuerzo constante trae grandes resultados</h2>
                    <p>En VALHALLA GYM, con más de 10 años de experiencia, ofrecemos 1,500 m² de instalaciones modernas con equipos de última generación. Contamos con clases grupales como yoga y spinning, áreas especializadas para cardio y fuerza, y entrenadores certificados que diseñan rutinas personalizadas. Estamos abiertos los 7 dias de la semana, para adaptarnos a tu ritmo de vida. ¡Únete a nuestra comunidad y transforma tu bienestar!</p>
                </div>
                <div className={style.aboutUs_section_image}>

                </div>
            </div>
            <WhyChooseUs />
        </div>
    );
}

export default AboutUsHome;