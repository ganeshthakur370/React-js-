import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useBasket } from '../store/BasketCtx'
import './topbar.css'

export default function Topbar() {
  const { count } = useBasket()
  const nav = useNavigate()
  const [qry, setQry] = useState('')

  function goSearch(e) {
    e.preventDefault()
    nav(qry.trim() ? `/?q=${encodeURIComponent(qry.trim())}` : '/')
  }

  return (
    <header className="sitetop">
      <div className="promostrip">
        Great deals, everyday prices
        <i className="fa-solid fa-grip-lines-vertical" />
        Free delivery on eligible orders
      </div>

      <div className="toprow">
        <Link to="/" className="brand" aria-label="Home">
          <i className="fa-brands fa-amazon" />
          <span className="tld">.in</span>
        </Link>

        <button className="barBtn locbtn">
          <span className="smlab">Deliver to</span>
          <strong>India <i className="fa-solid fa-caret-down" /></strong>
        </button>

        <form className="srchbox" onSubmit={goSearch}>
          <select className="srchcat" aria-label="Category">
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home">Home</option>
          </select>
          <input
            className="srchfld"
            type="search"
            placeholder="Search Amazon.in"
            value={qry}
            onChange={e => setQry(e.target.value)}
            autoComplete="off"
          />
          <button className="srchgo" type="submit" aria-label="Search">
            <i className="fa-solid fa-magnifying-glass" />
          </button>
        </form>

        <button className="barBtn lngbtn">
          <i className="fa-solid fa-globe" />
          <strong>EN <i className="fa-solid fa-caret-down" /></strong>
        </button>

        <button className="barBtn accbtn">
          <span className="smlab">Hello, sign in</span>
          <strong>Account &amp; Lists <i className="fa-solid fa-caret-down" /></strong>
        </button>

        <Link to="/orders" className="barBtn ordbtn">
          <span className="smlab">Returns</span>
          <strong>&amp; Orders</strong>
        </Link>

        <Link to="/cart" className="barBtn cartbtn">
          <i className="fa-solid fa-cart-shopping" />
          <span className="badge">{count}</span>
          <strong>Cart</strong>
        </Link>
      </div>

      <nav className="catnav">
        <Link to="/" className="navall"><i className="fa-solid fa-bars" />&nbsp; All</Link>
        <Link to="/?cat=deals">Today's Deals</Link>
        <Link to="/?cat=electronics">Mobiles</Link>
        <Link to="/?cat=fashion">Fashion</Link>
        <Link to="/?cat=home">Home &amp; Kitchen</Link>
        <Link to="/?cat=electronics">Electronics</Link>
        <Link to="/">Best Sellers</Link>
        <Link to="/">New Releases</Link>
        <span className="navoffer">Mega Shopping Week · Explore offers</span>
      </nav>
    </header>
  )
}
