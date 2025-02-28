

import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/LoginPage/Login'
import Home from './Pages/Home/Home'
import PublicLayout from './Layouts/PublicLayout/PublicLayout'
import Contact from './Components/contact'
import PrivateLayout from './Layouts/PrivateLayout/PrivateLayout'
import Dashboard from './Pages/Dashboard/Dashboard'

import Promotions from './Pages/Mail/Mail'
import Events from './Pages/Events/Events'
import NotFound from './Pages/NotFound/NotFound'
import Inventory from './Pages/Inventory/Inventory'
import Hola from './Components/Hola'
import User from './Pages/User/User'




function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} /> 
            <Route path="/contact" element={<Contact></Contact>} />

        </Route>

        <Route path="/login" element={<Login />} />
        {/* Rutas privadas: el layout se encargará de mostrar el sidebar */}
        <Route path="/dashboard" element={<PrivateLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='user' element={<User></User>}></Route>
            <Route path='membresias' element={<Hola></Hola>}></Route>
            <Route path="correo" element={<Promotions />} />
            <Route path="eventos" element={<Events />} />
            <Route path="inventario" element={<Inventory />} />
            
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
