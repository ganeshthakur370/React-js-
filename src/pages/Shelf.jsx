import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { fetchGoods } from '../store/api'
import Card from '../bits/Card'
import './shelf.css'

export default function Shelf() {
  const [goods, setGoods] = useState([])
  const [busy, setBusy] = useState(true)
  const [params] = useSearchParams()
  const qry = params.get('q') || ''
  const cat = params.get('cat') || ''

  useEffect(() => {
    setBusy(true)
    fetchGoods().then(data => {
      setGoods(data)
      setBusy(false)
    })
  }, [])

  const visible = goods.filter(g => {
    if (cat === 'deals') return true
    if (cat && g.category !== cat) return false
    if (qry && !g.name.toLowerCase().includes(qry.toLowerCase())) return false
    return true
  })

  if (busy) return <div className="spin"><i className="fa-solid fa-spinner fa-spin" /></div>

  return (
    <div>
      <section className="hero">
        <div className="hcopy">
          <p className="eyebrow">THE BIG SHOPPING EDIT</p>
          <h1>Find your next<br /><em>favourite thing.</em></h1>
          <p className="htext">Fresh finds across tech, style and home — all in one place.</p>
          <Link className="hbtn" to="/?cat=deals">
            Explore deals <i className="fa-solid fa-arrow-right-long" />
          </Link>
        </div>
        <div className="hart">
          <div className="aring" />
          <div className="aring aring2" />
          <div className="aframe">
            <img src="/assets/photo01.jpg" alt="Featured product" />
          </div>
          <div className="abadge">WEEKLY<br /><b>DEALS</b></div>
          <div className="asparkle"><i className="fa-solid fa-wand-magic-sparkles" /></div>
        </div>
        <div className="hdots">
          <span className="dot on" />
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
        </div>
      </section>

      <section className="qlinks">
        <Link to="/?cat=electronics"><i className="fa-solid fa-mobile-screen" />Mobiles</Link>
        <Link to="/?cat=electronics"><i className="fa-solid fa-laptop" />Computers</Link>
        <Link to="/?cat=fashion"><i className="fa-solid fa-shoe-prints" />Fashion</Link>
        <Link to="/?cat=home"><i className="fa-solid fa-house" />Home</Link>
        <Link to="/?cat=electronics"><i className="fa-solid fa-headphones" />Accessories</Link>
        <Link to="/?cat=deals"><i className="fa-solid fa-bolt" />Top deals</Link>
      </section>

      <div className="shead">
        <div>
          <p className="eyebrow">HANDPICKED FOR YOU</p>
          <h2>Today's top picks</h2>
        </div>
        <Link to="/?cat=deals">See all deals <i className="fa-solid fa-arrow-right-long" /></Link>
      </div>

      {visible.length === 0
        ? <p className="nomatch">No products found.</p>
        : <section className="pgrid">
            {visible.map(g => <Card key={g.id} item={g} />)}
          </section>
      }

      <section className="pbanner">
        <div>
          <p className="eyebrow">STYLE THAT MOVES WITH YOU</p>
          <h2>Everyday essentials.<br /><em>Extraordinary prices.</em></h2>
          <Link to="/?cat=fashion">Shop fashion <i className="fa-solid fa-arrow-right-long" /></Link>
        </div>
        <img src="/assets/photo05.jpg" alt="Fashion" />
        <div className="pbadge">UP TO<br /><b>40% OFF</b></div>
      </section>

      <section className="catsec">
        <div className="shead">
          <div>
            <p className="eyebrow">UPGRADE YOUR EVERYDAY</p>
            <h2>Popular in electronics</h2>
          </div>
          <Link to="/?cat=electronics">View all <i className="fa-solid fa-arrow-right-long" /></Link>
        </div>
        <div className="cgrid">
          {[{img:'/assets/photo10.jpg',lbl:'Cameras & photography'},{img:'/assets/photo03.jpg',lbl:'Audio & headphones'},{img:'/assets/photo04.jpg',lbl:'Smart wearables'},{img:'/assets/photo02.jpg',lbl:'Laptops & accessories'}].map(c => (
            <Link key={c.lbl} className="ccard" to="/?cat=electronics">
              <img src={c.img} alt={c.lbl} />
              <b>{c.lbl}</b>
              <span>Explore now <i className="fa-solid fa-arrow-right-long" /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="catsec">
        <div className="shead">
          <div>
            <p className="eyebrow">A LITTLE SOMETHING NEW</p>
            <h2>Refresh your style</h2>
          </div>
          <Link to="/?cat=fashion">Discover more <i className="fa-solid fa-arrow-right-long" /></Link>
        </div>
        <div className="cgrid">
          {[{img:'/assets/photo05.jpg',lbl:'Sneakers & footwear'},{img:'/assets/photo06.jpg',lbl:'Bags & backpacks'},{img:'/assets/photo07.jpg',lbl:'Beauty & skincare'},{img:'/assets/photo04.jpg',lbl:'Watches'}].map(c => (
            <Link key={c.lbl} className="ccard" to="/?cat=fashion">
              <img src={c.img} alt={c.lbl} />
              <b>{c.lbl}</b>
              <span>Shop now <i className="fa-solid fa-arrow-right-long" /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="homefeat">
        <div className="hfcopy">
          <p className="eyebrow">MAKE ROOM FOR COMFORT</p>
          <h2>Little upgrades.<br /><em>Big difference.</em></h2>
          <p>Thoughtful picks to make your space feel more like you.</p>
          <Link to="/?cat=home">Shop home essentials <i className="fa-solid fa-arrow-right-long" /></Link>
        </div>
        <div className="hfgal">
          <img src="/assets/photo11.jpg" alt="Bedding" />
          <img src="/assets/photo09.jpg" alt="Lamp" />
          <img src="/assets/photo08.jpg" alt="Mixer" />
        </div>
      </section>

      <section className="perks">
        {[
          {ic:'fa-truck-fast',h:'Fast delivery',s:'Convenience at your door'},
          {ic:'fa-rotate-left',h:'Easy returns',s:'Simple, hassle-free process'},
          {ic:'fa-lock',h:'Secure shopping',s:'Your data stays protected'},
          {ic:'fa-heart',h:'Curated picks',s:'Discover something new',reg:true}
        ].map(p => (
          <div key={p.h} className="perk">
            <i className={`fa-${p.reg?'regular':'solid'} fa-${p.ic}`} />
            <b>{p.h}</b>
            <small>{p.s}</small>
          </div>
        ))}
      </section>
    </div>
  )
}
