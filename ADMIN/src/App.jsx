import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { AuthContextProvider } from './context/authContext'
import Register from './pages/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AuthContextProvider>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
    </AuthContextProvider>
    </>
  )
}

export default App
