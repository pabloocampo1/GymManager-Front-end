import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate()

    function hola() {
        navigate("/contact")
    }
    return (
        <div>
           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita accusantium ex nulla quos hic asperiores sed, ullam velit possimus, quae nemo provident. Temporibus autem excepturi molestiae beatae odio non explicabo.

            <button onClick={() => hola()}>ir a contact</button>
        </div>
    );
}

export default Home;