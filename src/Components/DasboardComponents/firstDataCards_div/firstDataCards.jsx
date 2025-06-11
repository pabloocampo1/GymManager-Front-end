
import { formatMonth } from "../../../Utils/FormatMonth";
import ListNewUsers from "../../Charts/ListNewUsers";
import style from "./firstDataCards.module.css"

const FirstDataCards = ({ dataList = {} }) => {

    if (!dataList) {
        return <div></div>
    }

    return (
        <div className={style.firstDataCards}>
            <div className={style.containerData}>
                <div className={style.firstDataCards_div}>
                    <p className={style.description}>Entradas de visitas -<span className={style.span}> hoy</span></p>
                    <p className={style.data}>{dataList.totalVisitEntriesToday}</p>
                    <p className={style.date}>{` ${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`}</p>
                </div>
                <div className={style.firstDataCards_div}>
                    <p className={style.description}>Entradas de miembros -<span className={style.span}> hoy</span></p>
                    <p className={style.data}>{dataList.totalMemberEntriesToday}</p>
                    <p className={style.date}>{` ${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`}</p>
                </div>
                <div className={style.firstDataCards_div}>
                    <p className={style.description}>Total de entradas -<span className={style.span}> hoy</span></p>
                    <p className={style.data}>{dataList.totalVisitEntriesToday + dataList.totalMemberEntriesToday}</p>
                    <p className={style.date}>{` ${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`}</p>
                </div>
                <div className={style.firstDataCards_div}>
                    <p className={style.description}>Total de ingresos monetarios -<span className={style.span}> hoy</span></p>
                    <p className={style.data}>
                        {dataList.totalPaymentsToday?.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className={style.date}>{` ${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`}</p>
                </div>

                <div className={style.firstDataCards_div}>
                    <p className={style.description}>Total de ingresos monetarios -<span className={style.span}> mes</span></p>
                    <p className={style.data}>
                        {dataList.totalPaymentsThisMonth?.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className={style.date}>{formatMonth(new Date().getMonth() + 1)} / {`${new Date().getFullYear()}`}</p>
                </div>

                <div className={style.firstDataCards_div}>
                    <p className={style.description}>Total de suscrpciones vendidas -<span className={style.span}> mes</span></p>
                    <p className={style.data}>{dataList.totalNewSubscriptionsThisMonth}</p>
                    <p className={style.date}>{formatMonth(new Date().getMonth() + 1)} / {`${new Date().getFullYear()}`}</p>
                </div>
            </div>
            <div className={style.containerLastUser}>
                <ListNewUsers />
            </div>


        </div>
    );
};

export default FirstDataCards;