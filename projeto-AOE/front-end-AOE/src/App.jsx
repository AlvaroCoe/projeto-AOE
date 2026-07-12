import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Contato from './pages/Contato'
import QuemSomos from './pages/QuemSomos'
import Producao from './pages/Producao'
import ManutencaoAtivos from './pages/ManutencaoAtivos'
import Tripulacao from './pages/Tripulacao'
import Incidentes from './pages/Incidentes'

function App() {
  return (
    <BrowserRouter>

      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quem-somos" element={<QuemSomos />} />
        <Route path="/incidentes" element={<Incidentes />} />
        <Route path="/tripulacao" element={<Tripulacao />} />
        <Route path="/producao" element={<Producao />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/ManutencaoAtivos" element={<ManutencaoAtivos />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App

