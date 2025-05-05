import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const PrivateRoute = () => {
    const { state } = useContext(AuthContext);

   
    if (state.isAuthenticated === null) {
        return <div>Loading...</div>;  
    }

    if (!state.isAuthenticated ) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;