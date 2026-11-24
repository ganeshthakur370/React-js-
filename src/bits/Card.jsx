import { useBasket } from '../store/BasketCtx'
import './card.css'

function Stars({ n }) {
  return (
    <span className="starz">
      {[1,2,3,4,5].map(i => (
        <i key={i} className={i <= n ? 'fa-solid fa-star' : 'fa-regular fa-star'} />
      ))}
    </span>
  )
}

export default function Card({ item }) {
  const { addItem } = useBasket()

  return (
    <article className="gcard">
      {item.flag && <span className="gtag">{item.flag}</span>}
      <img src={item.img} alt={item.name} />
      <p className="gdept">{item.dept}</p>
      <h3>{item.name}</h3>
      <div className="gstars">
        <Stars n={item.stars} />
        <small>{item.votes.toLocaleString()}</small>
      </div>
      <p className="gprice">
        <sup>₹</sup>{item.price.toLocaleString()} <del>₹{item.was.toLocaleString()}</del>
      </p>
      <button className="addbtn" onClick={() => addItem(item)}>Add to cart</button>
    </article>
  )
}
