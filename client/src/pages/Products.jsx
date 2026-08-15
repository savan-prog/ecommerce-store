import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productServices.js";
import "../assets/css/products.css";
import ProductFilter from "../components/ProductFilter.jsx";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  // console.log(search);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [searchParams] = useSearchParams();
  //  console.log(searchParams.get("category"));

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const fetchProducts = async () => {
    const data = await getProducts();
    // console.log(data);
    setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <section className="products-page">
        <div className="container">
          <div className="section-title">
            <h2>All Products</h2>
            <p>Browse all our available Products</p>
          </div>
          <ProductFilter
            search={search}
            setSearch={setSearch}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <div className="products-grid">
            {filteredProducts.map((item) => {
              return <ProductCard key={item._id} items={item} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
