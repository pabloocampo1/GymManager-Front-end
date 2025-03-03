import React from 'react';
import style from "./Dashboard.module.css"
import Formatting from '../../Components/Charts/Formatting';
function Dashboard() {
    return (
        <div className={style.dashboard_container}>
            
            soy el maldito dashboard
           <Formatting />
            
        </div>
    );
}

export default Dashboard;