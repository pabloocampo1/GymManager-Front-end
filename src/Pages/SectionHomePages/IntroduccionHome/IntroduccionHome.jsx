import React, { useEffect, useState } from 'react';
import style from "./IntroduccionHome.module.css";
import { motion } from "framer-motion";

import imagen1 from "../../../assets/images/imagenValHallaSlider1.png";
import imagen2 from "../../../assets/images/imagenValHallaSlider2.png";
import imagen3 from "../../../assets/images/imagenValHallaSlider3.png";
import { Link } from 'react-router-dom';

const IntroduccionHome = () => {
    const images = [imagen1, imagen2, imagen3];
    const fullText = "El SALON DE LOS\nDIOSES";
    const [typedText, setTypedText] = useState("");

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setTypedText(fullText.slice(0, i + 1));
            i++;
            if (i >= fullText.length) clearInterval(interval);
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <section id='home' className={style.IntroduccionHome_container}>
            <div className={style.container_information_introduccion}>
                <p className={style.name_gym}>VALLHALLA GYM</p>

                <h1 className={style.tituloPrincipal}>
                    <span className={style.typewriter}>
                        {typedText.split("\n").map((line, i) => (
                        <React.Fragment key={i}>
                            {line}
                            {i < typedText.split("\n").length - 1 && <br />}
                        </React.Fragment>
                        ))}
                        <span className={style.cursor}></span> {/* <- Esta es la línea que parpadea */}
                    </span>
                </h1>
                <p className={style.text_introduction}>
                    Transforma tu cuerpo, transforma tu <br /> vida. ¡Únete a nuestra comunidad <br /> fitness!
                </p>
                <Link to="contact#contact"><button>Contactanos</button></Link>
            </div>

            <div className={style.container_bubble}>
                <motion.div
                    className={style.slider_track}
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                >
                    {images.concat(images).map((img, index) => (
                        <img key={index} src={img} alt={`slide-${index}`} style={{ marginLeft: 20 }} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default IntroduccionHome;
