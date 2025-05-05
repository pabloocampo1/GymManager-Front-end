import React, { useEffect, useState } from 'react';
import style from "./EventHome.module.css";
import EventService from '../../../Service/EventsService'; 
import TargetH from '../../../Components/Targets/TargetHomeEvent/TargetHomeEvent';
const EventHome = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await EventService.getAllEvents();
                setEvents(data);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Error al cargar eventos');
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return <p style={{ color: "white" }}>Cargando eventos...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>Error al cargar eventos: {error}</p>;
    }

    return (
        <div id='events' className={style.EventHome_container}>
            <div className={style.EventHome_intro}>
                <h2>Eventos</h2>
                <p>Entrena, diviértete y haz comunidad</p>
                <p>aquí siempre encontrarás una actividad para desafiarte y disfrutar. ¡Súmate al próximo evento y entrena con nosotros!"</p>
            </div>
            <div className={style.events_items_container}>
                <h2>Nuestros eventos</h2>
                <div className={style.eventlist}>
                    {Array.isArray(events) && events.length > 0 ? (
                        events.map((event) => (
                            <TargetH
                                key={event.id} 
                                event={event}
                            />
                        ))
                    ) : (
                        <p style={{ color: "white" }}>No hay Eventos disponibles</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventHome;