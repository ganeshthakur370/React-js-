import { Link, useNavigate } from 'react-router-dom'
import { useBasket } from '../store/BasketCtx'
import './cart.css'

export default function Cart() {
  const { basket, incQty, decQty, remItem } = useBasket()
  const nav = useNavigate()

  const total = basket.reduce((s, x) => s + x.price * x.qty, 0)
  const count = basket.reduce((s, x) => s + x.qty, 0)

  if (basket.length === 0) return (
    <div className="emptycart">
      <i className="fa-solid fa-cart-shopping" />
      <h2>Your cart is empty</h2>
      <Link to="/">Continue shopping</Link>
    </div>
  )

  return (
    <div className="trolleywrap">
      <div className="trows">
        <h1>Shopping Cart</h1>
        {basket.map(it => (
          <div key={it.id} className="trow">
            <img src={it.img} alt={it.name} />
            <div className="tinfo">
              <p className="tname">{it.name}</p>
              <p className="tdept">{it.dept}</p>
              <p className="tinstock">In Stock</p>
              <div className="tqty">
                <button onClick={() => decQty(it.id)}>−</button>
                <span>{it.qty}</span>
                <button onClick={() => incQty(it.id)}>+</button>
              </div>
              <button className="tremove" onClick={() => remItem(it.id)}>Delete</button>
            </div>
            <p className="tprice">₹{(it.price * it.qty).toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="tsumm">
        <p className="tsavetxt">
          <i className="fa-solid fa-check" /> Your order qualifies for FREE Delivery.
        </p>
        <p className="ttotal">
          Subtotal ({count} item{count !== 1 ? 's' : ''}): <strong>₹{total.toLocaleString()}</strong>
        </p>
        <button className="tcheckbtn" onClick={() => nav('/checkout')}>
          Proceed to Buy
        </button>
      </div>
    </div>
  )
}
