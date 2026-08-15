import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../services/productServices.js";
import "../assets/css/productDetails.css";
import { addToCart } from "../features/cart/cartSlice.js";
import { useDispatch } from "react-redux";

const ProductDetails = () => {
  const { id } = useParams();
  // console.log(id);

  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    const data = await getSingleProduct(id);
    // console.log(data);
    setProduct(data.product);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  if (!product) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <section className="product-details">
        <div className="container">
          <div className="product-details-wrapper">
            <div className="product-details-image">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="product-details-info">
              <p className="product-details-category">
                <strong>Category : </strong>
                {product.category}
              </p>
              <h1 className="product-details-title">{product.title}</h1>
              <div className="product-details-meta">
                <span className="product-details-rating">
                  ⭐ Rating : {product.rating}
                </span>
                <span className="product-details-price">
                  Price : ₹{product.price}
                </span>
              </div>
              <p className="product-details-description">
                {product.description}
              </p>
              <button className="add-cart-btn" onClick={handleAddToCart}>
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
