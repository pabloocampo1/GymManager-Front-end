import React from 'react';
import SideBar from '../Components/SideBar/SideBar';
import Dashboard from '../Pages/Dashboard/Dashboard';
import { Outlet } from 'react-router-dom';

const PrivateLayout = () => {
    return (
        <div>
           <Dashboard></Dashboard>
        </div>
    );
};

export default PrivateLayout;