import React, { useEffect, useState } from "react";
import "../assets/css/home.css";
import { getProducts } from "../services/productServices.js";
import ProductCard from "../components/ProductCard";
import ProductFilter from "../components/ProductFilter.jsx";
import HomeCategories from "../components/HomeCategories.jsx";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  //product fetch krenge jo api ke through productServices.js file mai liye hai vo
  const fetchProducts = async () => {
    const data = await getProducts();
    // console.log(data);
    setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setMessage("Please enter your email");
      return;
    } else {
      setMessage("Subscribe Successfully!");
      setEmail("");
    }
  };
  return (
    <>
      {/* Hero section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>
                Everything You Need,
                <br />
                All in One Place
              </h1>
              <p>
                Discover quality products across multiple categories with a
                simple, fast, and secure shopping experience.{" "}
              </p>
            </div>

            <div className="hero-image">
              <img
                src="/images/categories/hero-image2.jpeg"
                alt="Online shopping"
              />
            </div>
          </div>
        </div>
      </section>

      {/* featured Product section */}
      <section className="featured-products">
        <div className="container">
          <div className="section-title">
            <h2>Featured Products</h2>
            <p>Explore our handpicked collection of popular products.</p>
          </div>
          {/* <ProductFilter /> */}
          <div className="products-grid">
            {products.map((items) => {
              return <ProductCard key={items._id} items={items} />;
            })}
          </div>
        </div>
      </section>

      {/* categories section */}
      <HomeCategories />

      {/* NewsLetter Section */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h2>Subscribe to Our Newsletter</h2>
            <p>
              Get the latest products, exclusive offers, and shopping updates
              delivered to your inbox.
            </p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Subscribe</button>
            </form>
            {message && <p className="subscribe-message">{message}</p>}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
