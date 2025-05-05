import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const GuestRoute = () => {
    const {state} = useContext(AuthContext);


    if (state.isAuthenticated) {
        return <Navigate to="/dashboard" replace />
    }

    return <Outlet />
};

export default GuestRoute;