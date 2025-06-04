import React, { useState, useContext } from 'react';
import SideBar from '../../Components/SideBarComponent/SideBar';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import LogoutConfirmationModal from '../../Components/Modals/LogoutConfirmationModal/LogoutConfirmationModal';

import style from './privateLayout.module.css'

const PrivateLayout = () => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const { logout } = useContext(AuthContext);

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const handleCloseLogoutModal = () => {
        setShowLogoutModal(false);
    };

    const handleConfirmLogout = () => {
        setShowLogoutModal(false);
        logout();
    };

    return (
        <>
            <div className={style.privateLayout_container}>
                <div className={style.privateLayout_sidebar}>
                    <SideBar onLogoutClick={handleLogoutClick} />
                </div>

                <div className={style.privateLayout_main}>
                    <Outlet />
                </div>
            </div>

            {showLogoutModal && (
                <LogoutConfirmationModal
                    onClose={handleCloseLogoutModal}
                    onConfirm={handleConfirmLogout}
                />
            )}
        </>
    );
};

export default PrivateLayout;