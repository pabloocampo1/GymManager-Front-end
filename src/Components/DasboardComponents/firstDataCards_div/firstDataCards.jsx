import React from 'react';
import style from "./firstDataCards.module.css"

const FirstDataCards = () => {




    return (
        <div className={style.firstDataCards}>
            <div className={style.firstDataCards_div}>
                <p className={style.description}>Total de entradas -<span> hoy</span></p>
                <p className={style.data}>56</p>
                <p className={style.date}>{` ${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`}</p>
            </div>
            <div className={style.firstDataCards_div}>
                <p className={style.description}>Total de entradas -<span> hoy</span></p>
                <p className={style.data}>56</p>
                <p className={style.date}>{` ${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`}</p>
            </div>
            <div className={style.firstDataCards_div}>
                <p className={style.description}>Total de entradas -<span> hoy</span></p>
                <p className={style.data}>56</p>
                <p className={style.date}>{` ${new Date().getMonth()}`}</p>
            </div>
            <div className={style.firstDataCards_div}>
                <p className={style.description}>Total de entradas -<span> hoy</span></p>
                <p className={style.data}>56</p>
                <p className={style.date}>{` ${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`}</p>
            </div>
            <div className={style.firstDataCards_div}>
            <p className={style.description}>Total de entradas -<span> hoy</span></p>
                <p className={style.data}>56</p>
                <p className={style.date}>{` ${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`}</p>
            </div>
            <div className={style.firstDataCards_div}>
            <p className={style.description}>Total de entradas -<span> hoy</span></p>
                <p className={style.data}>56</p>
                <p className={style.date}>{` ${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`}</p>
            </div>

        </div>
    );
};

export default FirstDataCards;