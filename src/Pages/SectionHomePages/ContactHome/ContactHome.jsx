import React from 'react';
import style from "./ContactHome.module.css"
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

const ContactHome = () => {
    return (
        <div className={style.ContactHome_container}>
            <div className={style.container_intro_contact}>
                defd
            </div>
            
            <div className={style.container_contact}>
                <div className={style.section_details}>
                    <div className={style.section_details_information}>
                        <h2>Nuestros detalles de contacto</h2>
                        <div className={style.information_items}>
                            <div>
                                <div className={style.logo_details}>
                                    <LocalPhoneIcon />
                                </div>
                                <div className={style.details_about_contact} >
                                    <h3>Tefonos decontacto</h3>
                                    <ol>
                                        <li>343434</li>
                                        <li>34343</li>
                                    </ol>
                                </div>
                            </div>
                            <div><div className={style.logo_details}>
                                <EmailIcon> </EmailIcon>
                            </div>
                                <div className={style.details_about_contact} >
                                    <h3>Tefonos decontacto</h3>
                                    <ol>
                                        <li>343434</li>
                                        <li>34343</li>
                                    </ol>
                                </div></div>
                            <div>
                                <div className={style.logo_details}>
                                    <LocationOnIcon />
                                </div>
                                <div className={style.details_about_contact} >
                                    <h3>Tefonos decontacto</h3>
                                    <ol>
                                        <li>343434</li>
                                        <li>34343</li>
                                    </ol>
                                </div>
                            </div>
                            <div><div className={style.logo_details}>
                                <AccessTimeFilledIcon />
                            </div>
                                <div className={style.details_about_contact} >
                                    <h3>Tefonos decontacto</h3>
                                    <ol>
                                        <li>343434</li>
                                        <li>34343</li>
                                    </ol>
                                </div></div>
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