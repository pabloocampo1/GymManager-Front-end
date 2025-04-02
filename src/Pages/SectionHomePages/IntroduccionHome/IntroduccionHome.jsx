import React from 'react';
import style from "./IntroduccionHome.module.css"
import TypingEffect from '../../../Components/TypingEffect';
import { motion } from "framer-motion";

import imagen1 from "../../../assets/images/imagenValHallaSlider1.png"
import imagen2 from "../../../assets/images/imagenValHallaSlider2.png"
import imagen3 from "../../../assets/images/imagenValHallaSlider3.png"
import { Link } from 'react-router-dom';


const IntroduccionHome = () => {
    console.log(motion);

    const images = [
        imagen1,
        imagen2,
        imagen3
    ];

    return (
        <section id='home' className={style.IntroduccionHome_container}>
            <div className={style.container_information_introduccion}>
                <p className={style.name_gym}>VALLHALLA GYM</p>
                <h1><TypingEffect text={["El SALON DE LOS", "DIOSES"]} speed={80} /></h1>
                <p className={style.text_introduction}>Transforma tu cuerpo, transforma tu <br></br> vida. !Unete a nuestra comunidad <br /> fitness¡</p>
                <Link to="contact#contact"><button>Contactanos</button></Link>
            </div>
            <div className={style.container_bubble}>
                <motion.div
                    className={style.slider_track}
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                >
                    {images.concat(images).map((img, index) => (
                        <img key={index} src={img} alt={`slide-${index}`} style={{
                            marginLeft:20
                        }} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default IntroduccionHome;