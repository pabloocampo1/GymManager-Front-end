import React from 'react';
import style from "./ContactHome.module.css"

const ContactHome = () => {
    return (
        <div className={style.ContactHome_container}>

            {/* intro de la seccion de contacto */}
            <div className={style.container_intro_contact}>
                defd
            </div>
            {/*seccion de contacto */}
            <div className={style.container_contact}>
                <div className={style.section_details}>
                    <div className={style.section_details_information}>
                        <h2>Nuestros detalles de contacto</h2>
                        <div className={style.information_items}>
                            <div>1</div>
                            <div>2</div>
                            <div>3</div>
                            <div>4</div>
                        </div>
                    </div>
                    <div className={style.section_details_map}>
                            fdfdfd
                    </div>
                </div>
                <div className={style.section_send_mesagge}>
                    <div className={style.container_form}>
                        <h2>Envianos un mensaje</h2>
                        <div className={style.section_send_mesagge_items}>
                            <div className={style.send_mesagge_form_container}>
d
                            </div>
                            <div className={style.send_mesagge_socialMedia_container}>
f
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactHome;