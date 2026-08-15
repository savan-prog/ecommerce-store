import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/productCard.css";

const ProductCard = ({ items }) => {
  return (
    <Link to={`/products/${items._id}`} className="product-card">
      <div className="product-image">
        <img src={items.image} alt={items.title} />
      </div>
      <div className="product-info">
        <h3 className="product-title">{items.title}</h3>
        <p className="product-category">{items.category}</p>
        <hr className="product-divider" />
        <div className="product-bottom">
          <span className="product-price">₹ {items.price}</span>
          <span className="product-rating">⭐ {items.rating}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
