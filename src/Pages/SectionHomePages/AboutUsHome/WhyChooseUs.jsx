import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import style from "../AboutUsHome/AboutUsHome.module.css";
import personalTrainerIcon from "../../../assets/icons/undraw_personal-trainer_bqkg.svg"
import machineIcon from "../../../assets/icons/undraw_activity-tracker_3o6r.svg"
import peopleIocn from "../../../assets/icons/undraw_people_ka7y.svg"

const WhyChooseUs = () => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

    
    const cards = [
        {
            title: "Entrenadores Expertos",
            text: "Contamos con un equipo de entrenadores altamente capacitados para ayudarte a alcanzar tus metas.",
            image: personalTrainerIcon
        },
        {
            title: "Equipamiento de Alta Calidad",
            text: "Disponemos de los mejores equipos para que tu entrenamiento sea eficiente y seguro.",
            image:  machineIcon
        },
        {
            title: "Comunidad Motivadora",
            text: "Únete a una comunidad activa y comprometida que te apoyará en tu camino hacia el éxito.",
            image: peopleIocn
        }
    ];
    console.log(motion);
    

    return (
        <section ref={ref} className={style.whyChooseUs}>
            <h2 className={style.title}>¿Por qué elegirnos?</h2>

            <div className={style.container}>
                {cards.map((card, index) => (
                    <motion.div
                        key={index}
                        className={style.card}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
                        transition={{ duration: 0.10, delay: index * 0.2 }}
                    >
                        
                        <img src={card.image} alt={card.title} className={style.cardImage} />
                        
                        
                        <h3>{card.title}</h3>
                        <p>{card.text}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default WhyChooseUs;
