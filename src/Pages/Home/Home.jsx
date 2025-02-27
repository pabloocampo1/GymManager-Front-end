import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate()

    function hola() {
        navigate("/contact")
    }
    return (
        <div>
            HOME


            <button onClick={() => hola()}>ir a contact</button>
        </div>
    );
}

export default Home;