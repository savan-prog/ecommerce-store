import React from "react";
import "../assets/css/productFilter.css";
import { useNavigate } from "react-router-dom";

const ProductFilter = ({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
}) => {
  const navigate = useNavigate();

  const categories = ["All", "Electronics", "Accessories", "Beauty", "Fashion"];
  // console.log(selectedCategory);

  const handleCategory = (category) => {
    setSelectedCategory(category);

    if (category === "All") {
      navigate("/products");
    } else {
      navigate(`/products?category=${category}`);
    }
  };
  return (
    <div className="product-filter">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="category-filter">
        {categories.map((category) => {
          return (
            <button
              key={category}
              onClick={() => handleCategory(category)}
              className={selectedCategory === category ? "active" : ""}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductFilter;
