import React from 'react';
import SideBar from '../../Components/SideBar/SideBar';
import { Outlet } from 'react-router-dom';

function Dashboard() {
    return (
        <div>
            Dashboard
            <SideBar></SideBar>
            
        </div>
    );
}

export default Dashboard;