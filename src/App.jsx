

import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/LoginPage/Login'
import Home from './Pages/Home/Home'
import PublicLayout from './Layouts/PublicLayout'
import Contact from './Components/contact'



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
      </Routes>
    </BrowserRouter>
  )
}

export default App
