import Login from './pages/auth/Login/index.jsx'
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login />} />
    </Routes>
  )
}

export default App
