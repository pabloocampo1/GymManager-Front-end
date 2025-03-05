import  {motion} from "framer-motion";
import { useInView } from "react-intersection-observer";
import style from "../AboutUsHome/AboutUsHome.module.css"; 

const WhyChooseUs = () => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
    console.log(motion)
    return (
        <section ref={ref} className={style.whyChooseUs}>
            <h2 className={style.title}>¿Por qué elegirnos?</h2>

            <div className={style.container}>
                {["Entrenadores Expertos", "Equipamiento de Alta Calidad", "Comunidad Motivadora"].map((title, index) => (
                    <motion.div
                        key={index}
                        className={style.card}
                        initial={{ opacity: 0, y: 50 }} // Estado inicial (invisible y más abajo)
                        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }} // Asegura que siempre esté animado
                        transition={{ duration: 0.8, delay: index * 0.2 }} // Suavidad y delay progresivo
                    >   
                        <h3>{title}</h3>
                        <p>Descripción breve del beneficio de este servicio.</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default WhyChooseUs;
