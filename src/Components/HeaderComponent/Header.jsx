import React from 'react';
import style from './Header.module.css'


function Header() {
    return (
        <header className={style.headerContainer}>
            <ol>
                <li>hola</li>
                <li>hola 2</li>
                <li>hola 3</li>
            </ol>
        </header>
    );
}

export default Header