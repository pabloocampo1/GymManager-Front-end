

import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/LoginPage/Login'
import Home from './Pages/Home/Home'
import PublicLayout from './Layouts/PublicLayout'
import Contact from './Components/contact'
import PrivateLayout from './Layouts/PrivateLayout'
import Dashboard from './Pages/Dashboard/Dashboard'
import Promotions from './Pages/Mail/Mail'
import Events from './Pages/Events/Events'
import NotFound from './Pages/NotFound/NotFound'
import Inventory from './Pages/Inventory/Inventory'



function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} /> 
            <Route path="/contact" element={<Contact></Contact>} />

        </Route>

        <Route element={<Login />}>
            <Route index element={<Home />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact></Contact>} />
        </Route>
        <Route element={<PrivateLayout />}>
            <Route path="/dash" element={<Dashboard></Dashboard>} />
        </Route>
        <Route path="/correo" element={<Promotions />} />
        <Route path="/eventos" element={<Events />} />
        <Route path="/inventario" element={<Inventory />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
