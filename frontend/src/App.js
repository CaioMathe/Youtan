import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Login} from './pages/Login';
import {Home} from './pages/Home';
import { Navigation } from './pages/Navigations';
import {Logout} from './pages/Logout';
import {SingUp} from './pages/SingUp';
import { Client } from './pages/Client';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ClientEdit } from './pages/ClientEdit';

function App() {
    return <BrowserRouter>
            <Navigation></Navigation>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/singup" element={<SingUp/>}/>
              <Route path="/logout" element={<Logout/>}/>
              <Route path="/cliente/:id" element={<ClientEdit/>}/>
              <Route path="/cliente" element={<Client/>}/>


            </Routes>
          </BrowserRouter>;
}
export default App;