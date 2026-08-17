import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../assets/css/cart.css";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../features/cart/cartSlice.js";
import axios from "axios";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  // console.log(cartItems);

  const dispatch = useDispatch();

  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");

      const orderItems = cartItems.map((item) => {
        return {
          product: item._id,
          title: item.title,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        };
      });
      const res = await axios.post(
        "https://ecommerce-store-xf6d.onrender.com/api/orders",
        {
          orderItems,
          totalPrice: subtotal,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setOrderPlaced(true);

      setTimeout(() => {
        dispatch(clearCart());
        setOrderPlaced(false);
      }, 2000);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };
  //empty cart after click on the remove all items from cart
  if (cartItems.length === 0) {
    return (
      <section className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <h2>Your Cart is Empty</h2>
            <p>Add Some Product to Your Cart.</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <>
      <section className="cart-page">
        <div className="container">
          <h2 className="cart-heading">Cart Items</h2>
          <div className="cart-wrapper">
            <div className="cart-items">
              {cartItems.map((item) => {
                return (
                  <div className="cart-item" key={item._id}>
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className="cart-item-info">
                      <h3>{item.title}</h3>
                      <p>{item.category}</p>
                      <h4>₹ {item.price}</h4>
                      <div className="cart-actions">
                        <div className="quantity-controls">
                          <button onClick={() => handleDecrease(item._id)}>
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => handleIncrease(item._id)}>
                            +
                          </button>
                        </div>
                        <button
                          className="remove-btn"
                          onClick={() => handleRemove(item._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹ {subtotal}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <hr />
              <div className="summary-row total">
                <span>Total</span>
                <span>₹ {subtotal}</span>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
              {orderPlaced && (
                <p className="success-message">
                  ✅ Order Submitted Successfully
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
