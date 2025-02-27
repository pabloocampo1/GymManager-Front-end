
import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css'
import Login from './Pages/LoginPage/Login'
import PublicLayout from './Layouts/PublicLayout';
import PrivateLayout from './Layouts/PrivateLayout';
import Hola from './Components/Hola';
import Home from './Pages/Home/Home';


function App() {

  return (
    

      

    <Router>
        <Routes>
                {/* Layout público */}
                <Route element={<PublicLayout> <Outlet></Outlet> </PublicLayout>}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<Hola />} />
                </Route>

                {/* Layout privado */}
                <Route element={<PrivateLayout />}>
                    <Route path="/login" element={<Login />} />
                   
                </Route>
        </Routes>
  </Router>
    
  )
}

export default App
