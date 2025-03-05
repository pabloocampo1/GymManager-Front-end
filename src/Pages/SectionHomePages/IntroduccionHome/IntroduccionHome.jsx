import React from 'react';
import style from "./IntroduccionHome.module.css"
import TypingEffect from '../../../Components/TypingEffect';

const IntroduccionHome = () => {
    return (
        <section className={style.IntroduccionHome_container}>
            <div>
                <p className={style.name_gym}>VALLHALLA GYM</p>
                <h1><TypingEffect text="El SALON DE LOS DIOSES" speed={80}  /></h1>
                <p className={style.text_introduction}>Transforma tu cuerpo, transforma tu <br></br> vida. !Unete a nuestra comunidad <br /> fitness¡</p>
                <button>Contactanos</button>
            </div>
        </section>
    );
};

export default IntroduccionHome;