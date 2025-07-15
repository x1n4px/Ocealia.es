import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Home from './pages/home'
import FishPage from './pages/fish'
import AlgasGuide from './pages/algae'
import ProductsPage from './pages/products'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
         
            <Home />
        } />
        <Route path="/fish" element={<FishPage />} />
        <Route path="/algae" element={<AlgasGuide />} />
        <Route path="/product" element={<ProductsPage />} />
      </Routes>
    </Router>
  )
}

export default App
