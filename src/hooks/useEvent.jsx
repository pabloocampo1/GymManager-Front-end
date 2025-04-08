import { useState } from "react";
import { getAllEvent } from "../Service/EventService";
import { useEffect } from "react";

const useEvent = () => {
    const [events, setEvents] = useState();
    const [error, setError] = useState(null);


    useEffect(() => {
        const getEvent = async () => {
            try {
                const response = await getAllEvent();
                setEvents(response);
            } catch (err) {
                
                setError(err);
              } 
        }

        getEvent()
    },[])

    return { events,  error };
}

export default useEvent;