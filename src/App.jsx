import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/Auth/LoginPage/Login'
import Home from './Pages/SectionHomePages/Home/Home'
import Dashboard from './Pages/Admin/Dashboard/Dashboard'
import Promotions from './Pages/Admin/Mail/Mail'
import Events from './Pages/Admin/Events/Events'
import NotFound from './Pages/NotFound/NotFound'
import Inventory from './Pages/Admin/Inventory/Inventory'
import Membresias from './Pages/Admin/Membresias/Membresias'
import Miembros from './Pages/Admin/Miembros/Miembros'
import Profile from './Pages/Admin/ProfileGym/ProfileGym'
import ContactHome from './Pages/SectionHomePages/ContactHome/ContactHome'
import EventHome from './Pages/SectionHomePages/EventsHome/EventHome'
import ControlAcces from './Pages/Admin/ControlAcces'
import ForgotPassword from './Pages/Auth/ValidationPasswordForget/ValidationPassword'
import SecurityCode from './Pages/Auth/ValidationCodPassword/Validationcod'
import PublicLayout from './Layouts/PublicLayout/PublicLayout'
import PrivateLayout from './Layouts/PrivateLayout/PrivateLayout'
import { AuthContextProvider } from './Context/AuthContext'
import PrivateRoute from './Routes/PrivateRoute'
import GuestRoute from './Routes/GuestRoute'


import { GoogleOAuthProvider } from '@react-oauth/google'
import ActivityRegister from './Pages/Admin/Dashboard/ActivityRegister'

function App() {
    const clientId = "161148106630-1e8ad1edsce66mqtrt42roin5llu7ipb.apps.googleusercontent.com";

    return (

        <BrowserRouter>
            <GoogleOAuthProvider clientId={clientId}>
                <AuthContextProvider>
                    <AuthContextProvider>
                        < Routes >
                            <Route path="/" element={<PublicLayout />}>
                                <Route index element={<Home />} />
                                <Route path="/contact" element={<ContactHome />} />
                                <Route path="/eventsHome" element={<EventHome />} />
                                <Route index element={<Dashboard />} />
                                <Route path='acceso' element={<ControlAcces />}></Route>
                                <Route path='miembros' element={<Miembros />}></Route>
                                <Route path='membresias' element={<Membresias />}></Route>
                                <Route path="correo" element={<Promotions />} />
                                <Route path="eventos" element={<Events />} />
                                <Route path="inventario" element={<Inventory />} />
                                <Route path="perfil" element={<Profile />} />
                            </Route>

                            <Route path='/login' element={<GuestRoute />}>
                                <Route index element={<Login />} />
                            </Route>
                            <Route path='/ForgetPass' element={<ForgotPassword />} />
                            <Route path='/resetPassword' element={<SecurityCode />} />


                            <Route path="/dashboard" element={<PrivateRoute />}>
                                <Route element={<PrivateLayout />} >
                                    <Route index element={<Dashboard />} />
                                    <Route path='acceso' element={<ControlAcces />}>
                                    </Route>
                                    <Route path='miembros' element={<Miembros />}></Route>
                                    <Route path='membresias' element={<Membresias />}></Route>
                                    <Route path="correo" element={<Promotions />} />
                                    <Route path="eventos" element={<Events />} />
                                    <Route path="inventario" element={<Inventory />} />
                                    <Route path="perfil" element={<Profile />} />
                                </Route>
                            </Route>
                            <Route path="*" element={<NotFound />} />
                        </Routes >
                    </AuthContextProvider>
                </AuthContextProvider>
            </GoogleOAuthProvider>
        </BrowserRouter>


    )
}

export default App

