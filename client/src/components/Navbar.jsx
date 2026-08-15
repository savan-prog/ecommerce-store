import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../assets/css/navbar.css";
import { useSelector } from "react-redux";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  // console.log(cartItems);
  const totalItems = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  //localstorage se token get krenge login and register menu ko hide krne ke liye navbar se (jab user login ho tab login ke andar vale UI se)
  const token = localStorage.getItem("token");
  // console.log(token);
  const userName = localStorage.getItem("userName");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
    navigate("/");
    window.location.reload();
  };
  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          {/* logo */}
          <div className="logo">
            <NavLink to="/">Ecommerce App</NavLink>
          </div>
          <div className="nav-right">
            {/* menu */}
            <div className="nav-menu">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                Products
              </NavLink>
              {/* admin dashboard menu */}
              {role === "admin" && (
                <NavLink
                  to="/admin/dashboard"
                  className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                  }
                >
                  Admin Dashboard
                </NavLink>
              )}
            </div>
            {/* Authentication NavLink/menu */}
            <div className="auth-menu">
              {token ? (
                <>
                  <span className="user-name">
                    Hi, {userName.charAt(0).toUpperCase() + userName.slice(1)}
                  </span>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? "nav-link active-link" : "nav-link"
                    }
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive ? "nav-link active-link" : "nav-link"
                    }
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? "cart-icon active-link" : "cart-icon"
              }
            >
              <i className="fa-solid fa-cart-shopping"></i>
              <span className="cart-count">{totalItems}</span>
            </NavLink>
          </div>
          {/* Humburg button for mobile responsive */}
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"} `}></i>
          </button>

          {/* Mobile Menu */}
          <div className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "mobile-nav-link active-link" : "mobile-nav-link"
              }
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? "mobile-nav-link active-link" : "mobile-nav-link"
              }
              onClick={() => setMenuOpen(false)}
            >
              Products
            </NavLink>
            {/* Admin Dashboard */}
            {role === "admin" && (
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  isActive ? "mobile-nav-link active-link" : "mobile-nav-link"
                }
                onClick={() => setMenuOpen(false)}
              >
                Admin Dashboard
              </NavLink>
            )}
            {/* Login / Register OR User + Logout */}
            {token ? (
              <>
                <span className="mobile-user-name">
                  Hi, {userName.charAt(0).toUpperCase() + userName.slice(1)}
                </span>
                <button
                  className="mobile-logout-btn"
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "mobile-nav-link active-link" : "mobile-nav-link"
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? "mobile-nav-link active-link" : "mobile-nav-link"
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </NavLink>
              </>
            )}
            {/* Cart */}
            <NavLink
              to="/cart"
              className="mobile-cart-link"
              onClick={() => setMenuOpen(false)}
            >
              <i className="fa-solid fa-cart-shopping"></i>
              <span>Cart ({totalItems})</span>
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};
export default Navbar;
