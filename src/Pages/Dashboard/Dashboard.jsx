import ChartMembership from "../../Components/Charts/ChartMembership";
import FirstDataCards from "../../Components/DasboardComponents/firstDataCards_div/firstDataCards";
import style from "./Dashboard.module.css";
import React from 'react';


function Dashboard() {



    return (
        <div className={style.dashboard_container}>
            <FirstDataCards />
            <div className={style.charDuplaTwo}>
                <div className={style.ChartMembership_container}>
                    <ChartMembership />
                </div>
                <div className={style.topMembreship_container}>
                    <div>gfg</div>
                </div>
            </div>

        </div>
    );
}

export default Dashboard;