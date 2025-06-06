import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Home from './pages/home'
import FishPage from './pages/fish'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
         
            <Home />
        } />
        <Route path="/fish" element={<FishPage />} />
      </Routes>
    </Router>
  )
}

export default App
