import { Routes, Route } from 'react-router-dom'
import Topbar from './bits/Topbar'
import Footbar from './bits/Footbar'
import Shelf from './pages/Shelf'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import { BasketProvider } from './store/BasketCtx'

export default function Shell() {
  return (
    <BasketProvider>
      <Topbar />
      <main className="wrap">
        <Routes>
          <Route path="/" element={<Shelf />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>
      <Footbar />
    </BasketProvider>
  )
}
