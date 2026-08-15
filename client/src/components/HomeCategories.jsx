import React from "react";
import "../assets/css/homeCategories.css";
import { useNavigate } from "react-router-dom";

const HomeCategories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Electronics",
      image: "/images/categories/electronics.jpeg",
    },
    {
      title: "Accessories",
      image: "/images/categories/accessories.jpeg",
    },
    {
      title: "Beauty",
      image: "/images/categories/beauty.jpeg",
    },
    {
      title: "Fashion",
      image: "/images/categories/fashion.jpeg",
    },
  ];
  return (
    <section className="home-categories">
      <div className="container">
        <div className="section-title">
          <h2>Shop By Category</h2>
          <p>Choose your favourite category</p>
        </div>
        <div className="category-grid">
          {categories.map((category) => {
            return (
              <div
                className="category-card"
                key={category.title}
                onClick={() => navigate(`/products?category=${category.title}`)}
              >
                <img src={category.image} alt={category.title} />
                <h3>{category.title}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeCategories;
