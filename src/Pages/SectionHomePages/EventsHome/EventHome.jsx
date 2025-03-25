import React from 'react';
import style from "./EventHome.module.css"
import imageExample from "../../../assets/images/imagenValHallaSlider1.png"



const EventHome = () => {

    const events = [
        {
            "image": imageExample,
            "title": "Crossfit class",
            "description": "esto solo es un ejemplo de implemntacion para mas adelante",
            "place": "Gimansio VallHalla",
            "date": "20/04/03 12:00 PM"
        },
        {
            "image": imageExample,
            "title": "Crossfit class",
            "description": "esto solo es un ejemplo de implemntacion para mas adelante",
            "place": "Gimansio VallHalla",
            "date": "20/04/03 12:00 PM"
        }

    ]


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
                    {events.length <= 0 && <p className={style.text_no_events}>No hay eventos en este momento</p>}
                    <div className={style.event_item}>
                        {events && events.map((item, index) => (
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
                                            <p>{item.place}</p>
                                        </div>
                                        <div>
                                            <span>Hora y fecha</span>
                                            <p>{item.date}</p></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventHome;