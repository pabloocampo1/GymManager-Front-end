import CustomAxis from "../../Components/Charts/BarChartOne";
import ChartMembership from "../../Components/Charts/ChartMembership";
import TickPlacementBars from "../../Components/Charts/ChartPrice/TrickChart";
import BarsDatasetToTal from "../../Components/Charts/ChartTotalUserByMonth/TotalUserByMonth";
import PieActiveArc from "../../Components/Charts/FistChart";
import FirstDataCards from "../../Components/DasboardComponents/firstDataCards_div/firstDataCards";
import style from "./Dashboard.module.css";
import React from 'react';



function Dashboard() {
    return (
        <div className={style.dashboard_container}>
            <h2 className={style.title}>BIENVENIDO! <span>Nombre De Usuario</span></h2>
            <FirstDataCards />

            <div className={style.charDuplaOne} >
                <TickPlacementBars />
                <ChartMembership />
            </div>
            <div className={style.charDuplaTwo}>
                <div className={style.ChartMembership_container}>
                    <p>Cantidad de yo no se que</p>
                    <CustomAxis />
                </div>
                <div className={style.topMembreship_container}>
                    <p>Cantidad de yo no se que</p>
                    <PieActiveArc />

                </div>
            </div>
            <div className={style.totalPeopleByMonth_coontainer}>
                <p>Cantidad de yo no se que</p>
                <BarsDatasetToTal />
            </div>

        </div>
    );
}

export default Dashboard;