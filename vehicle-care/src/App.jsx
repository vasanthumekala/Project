import Login from './pages/auth/Login/index.jsx'
import NotFound from './pages/NotFound/index.jsx'
import Register from './pages/auth/Register/index.jsx'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/index.jsx'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/n' element={<NotFound />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
