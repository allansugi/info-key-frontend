import './App.css'
import Home from './pages/home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import Vault from './pages/vault'
import Profile from './pages/Profile'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/vault" element={<Vault/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
