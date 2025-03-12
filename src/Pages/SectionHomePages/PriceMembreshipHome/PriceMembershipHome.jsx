import React from 'react';
import style from "./PriceMembership.module.css"
import { motion } from 'framer-motion';
import { useInView } from "react-intersection-observer";

const PriceMembershipHome = () => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
    console.log(motion)
    return (
        <div className={style.priceMembership_container}>
            <h2  className={style.h2_title}>
                Nuestros Precios
            </h2>
            <div ref={ref}  className={style.tipePrice_container}>
                <motion.div className={style.content_container_price}
                    initial={{ opacity: 0, x: -90 }}
                    animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -90 }}
                    transition={{ duration: 1 }}
                >
                    <h3>primer punto</h3>
                    <p><span style={{color:'white'}}>$</span>4545 <span>/ Dia</span></p>
                    <div>
                    <ul>
                        <li>- dfgdfgdf</li>
                        <li>- dfgdfgfd</li>
                        <li>- dfgdfgdfg</li>
                        <li>- ddfdfgdfd</li>
                        <li>- dfgdf</li>
                    </ul>
                    </div>
                </motion.div>
                <motion.div className={style.content_container_price}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
                    transition={{ duration: 1 }}
                >
                    <h3>primer punto</h3>
                    <p><span style={{color:'white'}}>$</span>4545 <span>/ Dia</span></p>
                    <div>
                    <ul>
                        <li>- dfgdfgdf</li>
                        <li>- dfgdfgfd</li>
                        <li>- dfgdfgdfg</li>
                        <li>- ddfdfgdfd</li>
                        <li>- dfgdf</li>
                    </ul>
                    </div>
                </motion.div>
                <motion.div className={style.content_container_price}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -50 }}
                    transition={{ duration: 1 }}
                >
                    <h3>primer punto</h3>
                    <p><span style={{color:'white'}}>$</span>4545 <span>/ Dia</span></p>
                    <div>
                    <ul>
                        <li>- dfgdffgf sdsd sd sds ds ds  sdsdsd d gdf</li>
                        <li>- dfgdfgfd</li>
                        <li>- dfgdfgdfg</li>
                        <li>- ddfdfgdfd</li>
                        <li>- dfgdf</li>
                    </ul>
                    </div>
                </motion.div>
                <motion.div className={style.content_container_price}
                    initial={{ opacity: 0, x: 90 }}
                    animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 90 }}
                    transition={{ duration: 1 }}
                >
                   <h3>primer punto</h3>
                    <p><span style={{color:'white'}}>$</span>4545 <span>/ Dia</span></p>
                    <div>
                    <ul>
                        <li>- dfgdfgdf</li>
                        <li>- dfgdfgfd</li>
                        <li>- dfgdfgdfg</li>
                        <li>- ddfdfgdfd</li>
                        <li>- dfgdf</li>
                    </ul>
                    </div>
                </motion.div>
                
                
            </div>
        </div>
    );
};

export default PriceMembershipHome;