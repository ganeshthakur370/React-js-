import { Link } from 'react-router-dom'
import './orders.css'

export default function Orders() {
  const list = JSON.parse(localStorage.getItem('amz_orders') || '[]')

  if (list.length === 0) return (
    <div className="noorders">
      <i className="fa-solid fa-box-open" />
      <h2>No orders yet</h2>
      <Link to="/">Start shopping</Link>
    </div>
  )

  return (
    <div className="ordwrap">
      <h1>Your Orders</h1>
      {list.map(o => (
        <div key={o.id} className="ocard">
          <div className="ohead">
            <div>
              <span>ORDER PLACED</span>
              <strong>{o.date}</strong>
            </div>
            <div>
              <span>TOTAL</span>
              <strong>₹{o.total.toLocaleString()}</strong>
            </div>
            <div>
              <span>SHIP TO</span>
              <strong>{o.name}</strong>
            </div>
            <div className="oid">
              <span>ORDER #</span>
              <strong>{o.id}</strong>
            </div>
          </div>
          <div className="obody">
            <p className="ostatus"><i className="fa-solid fa-truck-fast" /> Arriving soon</p>
            {o.items.map(it => (
              <div key={it.id} className="oitem">
                <img src={it.img} alt={it.name} />
                <div>
                  <p>{it.name}</p>
                  <small>Qty: {it.qty} · ₹{(it.price * it.qty).toLocaleString()}</small>
                </div>
              </div>
            ))}
            <p className="opay">
              Payment: {o.pay === 'cod' ? 'Cash on Delivery' : o.pay === 'card' ? 'Card' : 'UPI'} · {o.addr}
            </p>
          </div>
        </div>
      ))}
      <Link to="/" className="shopmore">Continue shopping</Link>
    </div>
  )
}
