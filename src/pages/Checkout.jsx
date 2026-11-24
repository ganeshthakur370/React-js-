import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBasket } from '../store/BasketCtx'
import './checkout.css'

export default function Checkout() {
  const { basket, clearAll } = useBasket()
  const nav = useNavigate()
  const [form, setForm] = useState({ name:'', addr:'', city:'', pin:'', pay:'cod' })
  const [done, setDone] = useState(false)

  const total = basket.reduce((s, x) => s + x.price * x.qty, 0)
  const count = basket.reduce((s, x) => s + x.qty, 0)

  function chg(e) { setForm(f => ({ ...f, [e.target.name]: e.target.value })) }

  function place(e) {
    e.preventDefault()
    const order = {
      id: Date.now(),
      items: basket,
      total,
      name: form.name,
      addr: `${form.addr}, ${form.city} - ${form.pin}`,
      pay: form.pay,
      date: new Date().toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })
    }
    const prev = JSON.parse(localStorage.getItem('amz_orders') || '[]')
    localStorage.setItem('amz_orders', JSON.stringify([order, ...prev]))
    clearAll()
    setDone(true)
  }

  if (basket.length === 0 && !done) {
    return (
      <div className="emptycart" style={{ textAlign:'center', padding:80 }}>
        <h2>Nothing to checkout</h2>
        <a href="/" style={{ color:'#c45500' }}>Go shopping</a>
      </div>
    )
  }

  if (done) return (
    <div className="placed">
      <i className="fa-solid fa-circle-check" />
      <h2>Order placed!</h2>
      <p>Thank you, {form.name}. Your order will be delivered soon.</p>
      <button onClick={() => nav('/')}>Continue shopping</button>
      <button onClick={() => nav('/orders')}>View orders</button>
    </div>
  )

  return (
    <div className="ckwrap">
      <form className="ckform" onSubmit={place}>
        <h1>Checkout</h1>

        <section className="cksect">
          <h2>1. Delivery address</h2>
          <label>Full name<input name="name" value={form.name} onChange={chg} required /></label>
          <label>Street address<input name="addr" value={form.addr} onChange={chg} required /></label>
          <div className="ckrow">
            <label>City<input name="city" value={form.city} onChange={chg} required /></label>
            <label>PIN code<input name="pin" value={form.pin} onChange={chg} required maxLength={6} /></label>
          </div>
        </section>

        <section className="cksect">
          <h2>2. Payment</h2>
          <label className="radio">
            <input type="radio" name="pay" value="cod" checked={form.pay==='cod'} onChange={chg} />
            Cash on Delivery
          </label>
          <label className="radio">
            <input type="radio" name="pay" value="card" checked={form.pay==='card'} onChange={chg} />
            Credit / Debit card (demo)
          </label>
          <label className="radio">
            <input type="radio" name="pay" value="upi" checked={form.pay==='upi'} onChange={chg} />
            UPI (demo)
          </label>
        </section>

        <section className="cksect">
          <h2>3. Review items</h2>
          {basket.map(it => (
            <div key={it.id} className="ckitem">
              <img src={it.img} alt={it.name} />
              <div>
                <p>{it.name}</p>
                <small>Qty: {it.qty}</small>
              </div>
              <p>₹{(it.price * it.qty).toLocaleString()}</p>
            </div>
          ))}
        </section>

        <div className="ckfoot">
          <p className="cktotal">Order total ({count} item{count!==1?'s':''}): <strong>₹{total.toLocaleString()}</strong></p>
          <button type="submit" className="ckplace">Place your order</button>
        </div>
      </form>
    </div>
  )
}
