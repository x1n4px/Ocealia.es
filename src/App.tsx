import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
 
import Home from './pages/home'
import FishPage from './pages/fish'
import AlgasGuide from './pages/algae'
import AssistantPage from './pages/assistant'
import FishDiseasesGuide from './pages/fish-diseases'
import InformesPage from './pages/informes'

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={
         
            <Home />
        } />
        <Route path="/peces" element={<FishPage />} />
        <Route path="/algas" element={<AlgasGuide />} />
        <Route path="/nemo" element={<AssistantPage />} />
        <Route path="/enfermedades" element={<FishDiseasesGuide />} />
        <Route path="/informes" element={<InformesPage />} />
      </Routes>
    </Router>
  )
}

export default App
