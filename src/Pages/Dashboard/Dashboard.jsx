import ChartMembership from "../../Components/Charts/ChartMembership";
import style from "./Dashboard.module.css";
import React from 'react';

    
    function Dashboard() {


       
        return (
            <div className={style.dashboard_container}>
                <div className={style.firstDataCards}>
                    <div>
                        
                    </div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>

                </div>
            <ChartMembership />
                
            </div>
        );
    }

    export default Dashboard;