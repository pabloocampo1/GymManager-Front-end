import React from 'react';
import style from "./EventHome.module.css"
import imageExample from "../../../assets/images/imagenValHallaSlider1.png"
import useEvent from '../../../hooks/useEvent';



const EventHome = () => {

    const { events } = useEvent([]);
    
    return (
        <div id='events' className={style.EventHome_container}>
            <div className={style.EventHome_intro}>
                <h2>Eventos</h2>
                <p>Entrena, diviértete y haz comunidad</p>
                <p>aquí siempre encontrarás una actividad para desafiarte y disfrutar. ¡Súmate al próximo evento y entrena con nosotros!"</p>
            </div>
            <div className={style.events_items_container}>
                <h2>Nuestros eventos</h2>
                <div>

                    <div className={style.event_item}>
                        {Array.isArray(events) && events.length > 0 ? (
                            events.map((item, index) => (
                                <div key={index} className={style.content_event}>
                                    <div className={style.div_image}>
                                        <img src={imageExample} alt={`imagen numero ${index}`} />
                                    </div>
                                    <div className={style.data_about_event}>
                                        <h4>{item.title}</h4>
                                        <p>{item.description}</p>
                                        <div className={style.div_date_place}>
                                            <div>
                                                <span>Lugar</span>
                                                <p>{item.place === "" ? "juan sito" : item.place}</p>
                                            </div>
                                            <div>
                                                <span>Hora y fecha</span>
                                                <p>{item.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{color:"white"}}>No hay Eventos disponibles</p>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventHome;