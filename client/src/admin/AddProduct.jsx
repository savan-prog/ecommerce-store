import React, { useState } from "react";
import "../assets/css/add-product.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrl = await uploadImage();
    // console.log(imageUrl);

    //agar image upload nhi hui to uska validation
    if (!imageUrl) {
      alert("Image upload failed");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/products",
        {
          title,
          description,
          price,
          category,
          rating,
          image: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      // console.log(response.data);

      alert("Product Added Successfully");

      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
      setRating("");
      setImage(null);

      navigate("/admin/manage-products");
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      alert("please select image");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "Ecommerce-project-images");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dlvd6hufx/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await res.json();
      // console.log(data);
      const uploadedImage = data.secure_url;
      // console.log(uploadedImage);
      return uploadedImage;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="add-product">
      <div className="main-topbar">
        <div className="page-header">
          <h2>Dashboard</h2>
          <div className="breadcrumb">
            <span>Dashboard</span>
            <span>/ Products</span>
            <span>/ Add Product</span>
          </div>
        </div>
      </div>
      <div className="product-form-container">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="productTitle">Product Title</label>
              <input
                type="text"
                id="productTitle"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                placeholder="Enter Price"
                min="1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Accessories">Accessories</option>
                <option value="Fashion">Fashion</option>
                <option value="Beauty">Beauty</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="rating">Rating</label>
              <input
                type="number"
                id="rating"
                placeholder="1-5"
                min="1"
                max="5"
                step="0.1"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="image">Product Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows="6"
              placeholder="Enter Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
