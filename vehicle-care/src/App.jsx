import Login from './pages/auth/Login/index.jsx'
import NotFound from './pages/NotFound/index.jsx'
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/n' element={<NotFound />} />
    </Routes>
  )
}

export default App
