import React from 'react';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import WhyChooseUs from './WhyChooseUs';
import style from "../AboutUsHome/AboutUsHome.module.css";

function AboutUsHome() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
    console.log(motion);

    return (
        <div className={style.aboutUs_container} id='aboutUs'>
            <div ref={ref} className={style.aboutUs_section} >
                <motion.div
                    className={style.aboutUs_section_text}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className={style.aboutUs_section_text_initial}>Sobre Nosotros</h2>
                    <span>Centro fitness y deportivo</span>

                    <p>
                        En VALHALLA GYM, con más de 10 años de experiencia, ofrecemos 1,500 m² de instalaciones modernas con equipos de última generación. ¡Tra comunidad y transforma tu bienestar!
                    </p>
                </motion.div>

                <motion.div
                    className={style.aboutUs_section_image}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
                    transition={{ duration: 0.7 }}
                >

                </motion.div>
            </div>

            <WhyChooseUs />

            <div className={style.stadistics_container}>
                <div>
                    <span>300+</span>
                    <p>Mimebros activos</p>
                </div>
                <div>
                <span>5+</span>
                <p>Años en el mercado</p>

                </div>
                <div>
                <span>7</span>
                <p>Dias de la semana</p>
                </div>
                <div>

                <span>3+</span>
                <p>Tiipos de membresias</p>
                </div>
            </div>
           
        </div>
    );
}

export default AboutUsHome;
