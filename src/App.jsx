import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/LoginPage/Login'
import Home from './Pages/Home/Home'
import PublicLayout from './Layouts/PublicLayout/PublicLayout'
import PrivateLayout from './Layouts/PrivateLayout/PrivateLayout'
import Dashboard from './Pages/Dashboard/Dashboard'
import Promotions from './Pages/Mail/Mail'
import Events from './Pages/Events/Events'
import NotFound from './Pages/NotFound/NotFound'
import Inventory from './Pages/Inventory/Inventory'
import Membresias from './Pages/Membresias/Membresias'
import Miembros from './Pages/Miembros/Miembros'
import Profile from './Pages/ProfileGym/ProfileGym'
import ContactHome from './Pages/SectionHomePages/ContactHome/ContactHome'
import EventHome from './Pages/SectionHomePages/EventsHome/EventHome'
import ControlAcces from './Pages/ControlAcces'
import ForgotPassword from './Pages/ValidationPasswordForget/ValidationPassword'
import SecurityCode from './Pages/ValidationCodPassword/Validationcod'
import { AuthContextProvider } from './Context/AuthContext'
import PrivateRoute from './Routes/PrivateRoute'


function App() {


    return (

        <BrowserRouter>
            <AuthContextProvider>
                <Routes>
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

                    <Route path="/login" element={<Login />} />
                    <Route path='/ForgetPass' element={<ForgotPassword />} />
                    <Route path='/CodePass' element={<SecurityCode />} />


                    <Route path="/dashboard" element={<PrivateRoute />}>
                        <Route  element={<PrivateLayout />} >
                            <Route index element={<Dashboard />} />
                            <Route path='acceso' element={<ControlAcces />}></Route>
                            <Route path='miembros' element={<Miembros />}></Route>
                            <Route path='membresias' element={<Membresias />}></Route>
                            <Route path="correo" element={<Promotions />} />
                            <Route path="eventos" element={<Events />} />
                            <Route path="inventario" element={<Inventory />} />
                            <Route path="perfil" element={<Profile />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AuthContextProvider>
        </BrowserRouter>


    )
}

export default App
