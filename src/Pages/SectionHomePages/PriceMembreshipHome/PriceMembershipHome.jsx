import React, { useEffect, useRef, useState } from 'react';
import style from "./PriceMembership.module.css";
import { motion } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import VanillaTilt from "vanilla-tilt";
import MembresiaService from "../../../Service/MembresiaService";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PriceMembershipHome = () => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
    const tiltRefs = useRef([]);
    const [membresias, setMembresias] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarMembresias = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await MembresiaService.getAllMembresiaPublic();
                if (Array.isArray(data)) {
                    setMembresias(data);
                } else {
                    setError('Error al cargar las membresías');
                }
            } catch (error) {
                console.error('Error al cargar las membresías:', error);
                setError('Error al cargar las membresías');
            } finally {
                setIsLoading(false);
            }
        };

        cargarMembresias();
    }, []);

    useEffect(() => {
        if (!isLoading && membresias.length > 0) {
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
        }
    }, [isLoading, membresias]);

    if (isLoading) {
        return (
            <div id='price' className={style.priceMembership_container}>
                <h2 className={style.h2_title}>Cargando membresías...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div id='price' className={style.priceMembership_container}>
                <h2 className={style.h2_title}>{error}</h2>
            </div>
        );
    }

    return (
        <div id='price' className={style.priceMembership_container}>
            <h2 className={style.h2_title}>Nuestros Precios</h2>
            <div ref={ref} className={style.tipePrice_container}>
                {membresias.map((membresia, index) => (
                    <motion.div
                        key={membresia.id}
                        ref={(el) => (tiltRefs.current[index] = el)}
                        className={`${style.content_container_price} ${style[membresia.type.toLowerCase()]}`}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : index % 2 === 0 ? -50 : 50 }}
                        transition={{ duration: 1 }}
                    >
                        <h3>{membresia.title}</h3>
                        <p>
                            <span style={{ color: 'white' }}>$</span>
                            {membresia.price.toLocaleString()}
                            <span> / {membresia.duration} días</span>
                        </p>
                        <div>
                            <ul className={style.benefits_list}>
                                {membresia.benefits && membresia.benefits.map((benefit, idx) => (
                                    <li key={idx}>
                                        <CheckCircleIcon className={style.check_icon} />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PriceMembershipHome;
