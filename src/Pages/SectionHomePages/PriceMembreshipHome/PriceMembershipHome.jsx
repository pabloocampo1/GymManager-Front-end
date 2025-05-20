import React, { useEffect, useRef } from 'react';
import style from "./PriceMembership.module.css";
import { motion } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import VanillaTilt from "vanilla-tilt";

const PriceMembershipHome = () => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
    const tiltRefs = useRef([]);

    useEffect(() => {
        tiltRefs.current.forEach((el) => {
            if (el) {
                VanillaTilt.init(el, {
                    max: 15,
                    speed: 400,
                    glare: true,
                    "max-glare": 0.3,
                });
            }
        });
    }, []);

    return (
        <div id='price' className={style.priceMembership_container}>
            <h2 className={style.h2_title}>Nuestros Precios</h2>
            <div ref={ref} className={style.tipePrice_container}>
                {[...Array(7)].map((_, index) => (
                    <motion.div
                        key={index}
                        ref={(el) => (tiltRefs.current[index] = el)}
                        className={style.content_container_price}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : index % 2 === 0 ? -50 : 50 }}
                        transition={{ duration: 1 }}
                    >
                        <h3>Plan {index + 1}</h3>
                        <p><span style={{ color: 'white' }}>$</span>4545 <span>/ Día</span></p>
                        <div>
                            <ul>
                                <li>- Beneficio 1</li>
                                <li>- Beneficio 2</li>
                                <li>- Beneficio 3</li>
                                <li>- Beneficio 4</li>
                                <li>- Beneficio 5</li>
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PriceMembershipHome;
