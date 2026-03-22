import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LayoutBase } from './componentes/LayoutBase'
import { PaginaDashboard } from './paginas/PaginaDashboard'
import { PaginaPedidos } from './paginas/PaginaPedidos'

export default function App() {
  return (
    <BrowserRouter>
      <LayoutBase>
        <Routes>
          <Route path="/" element={<PaginaDashboard />} />
          <Route path="/pedidos" element={<PaginaPedidos />} />
        </Routes>
      </LayoutBase>
    </BrowserRouter>
  )
}
