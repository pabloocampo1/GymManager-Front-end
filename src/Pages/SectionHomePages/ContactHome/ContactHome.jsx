import React from 'react';
import style from "./ContactHome.module.css"

const ContactHome = () => {
    return (
        <div className={style.ContactHome_container}>
            <div className={style.infomation_container}>
                <h2>Nuestros detalles de contacto</h2>
                <div className={style.information_details}>
                     <div>
                        <div>111</div>
                        <div>11</div>
                     </div>
                     <div>
                        <div>22</div>  
                        <div>22</div>
                     </div>
                </div>
                <div className={style.location_contact}>
                        
                </div>
            </div>
            <div className={style.send_mesagge_section}>

            </div>
        </div>
    );
};

export default ContactHome;