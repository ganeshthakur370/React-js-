import './footbar.css'

export default function Footbar() {
  return (
    <footer className="ftr">
      <a className="backtop" href="#">
        <i className="fa-solid fa-arrow-up" /> Back to top
      </a>
      <div className="ftrcols">
        <div>
          <h3>Get to know us</h3>
          <a href="#">About Amazon</a>
          <a href="#">Careers</a>
          <a href="#">Press &amp; news</a>
          <a href="#">Our story</a>
        </div>
        <div>
          <h3>Shop with us</h3>
          <a href="#">Your account</a>
          <a href="#">Today's deals</a>
          <a href="#">Gift cards</a>
          <a href="#">Shopping help</a>
        </div>
        <div>
          <h3>Make money with us</h3>
          <a href="#">Sell on Amazon</a>
          <a href="#">Affiliate programme</a>
          <a href="#">Advertise products</a>
          <a href="#">Partner with us</a>
        </div>
        <div>
          <h3>Let us help you</h3>
          <a href="#">Your orders</a>
          <a href="#">Shipping information</a>
          <a href="#">Returns &amp; refunds</a>
          <a href="#">Help centre</a>
        </div>
      </div>
      <div className="ftrbot">
        <span className="ftrbrand"><i className="fa-solid fa-bag-shopping" /> Amaz<span>on</span></span>
        <span className="ftrlocale">India · English</span>
      </div>
      <p className="disclaim">© 2026 Amazon Clone Demo. Educational project — not affiliated with Amazon.</p>
    </footer>
  )
}
