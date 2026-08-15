import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h2>
              <Link to="/">Ecommerce App</Link>
            </h2>
            <p>
              Your one-stop destination for quality products at the best prices.
            </p>
          </div>
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Categories</h3>
            <ul>
              <li>
                <Link to="/products?category=Electronics">Electronics</Link>
              </li>
              <li>
                <Link to="/products?category=Accessories">Accessories</Link>
              </li>
              <li>
                {" "}
                <Link to="/products?category=Beauty">Beauty</Link>
              </li>
              <li>
                <Link to="/products?category=Fashion">Fashion</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Contact</h3>
            <ul>
              <li>Email : support@gmail.com</li>
              <li>Phone : +91 8975985457</li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Follow Us</h3>
            <div className="footer-social">
              <a href="#">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Ecommerce. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
