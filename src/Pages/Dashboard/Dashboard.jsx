import CustomAxis from "../../Components/Charts/BarChartOne";
import ChartMembership from "../../Components/Charts/ChartMembership";
import TickPlacementBars from "../../Components/Charts/ChartPrice/TrickChart";
import PieActiveArc from "../../Components/Charts/FistChart";
import FirstDataCards from "../../Components/DasboardComponents/firstDataCards_div/firstDataCards";
import style from "./Dashboard.module.css";
import React from 'react';


function Dashboard() {
    return (
        <div className={style.dashboard_container}>
            <h2 className={style.title}>WELCOME BACK - <span>Juan Pablo hermoso</span></h2>
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
                    Aca iria algo.
                    <PieActiveArc />
                    
                </div>
            </div>

        </div>
    );
}

export default Dashboard;