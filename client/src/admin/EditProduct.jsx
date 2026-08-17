import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../assets/css/add-product.css";

const EditProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getSingleProduct();
  }, []);

  const getSingleProduct = async () => {
    try {
      const res = await axios.get(`https://ecommerce-store-xf6d.onrender.com/api/products/${id}`);
      //    console.log(res.data);
      const product = res.data.product;
      setTitle(product.title);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setRating(product.rating);
      // image state me purani image ka URL store karenge
      setImage(product.image);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //purani image ka url if user image change nhi krta hai to (esme image ka url string hota hai)
    let imageUrl = image;

    // Agar user ne nayi image select ki hai
    if (typeof image !== "string") {
      imageUrl = await uploadImage();
    }

    try {
      const response = await axios.put(
        `https://ecommerce-store-xf6d.onrender.com/api/products/${id}`,
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

      alert("Product Updated Successfully");
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
    <div className="edit-product">
      <div className="main-topbar">
        <div className="page-header">
          <h2>Dashboard</h2>
          <div className="breadcrumb">
            <span>Dashboard</span>
            <span>/ Products</span>
            <span>/ Edit Product</span>
          </div>
        </div>
      </div>
      <div className="product-form-container">
        <h2>Edit Product</h2>
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
          {image && (
            <img
              src={
                typeof image === "string" ? image : URL.createObjectURL(image)
              }
              alt="Preview"
              style={{
                width: "120px",
                marginTop: "10px",
                borderRadius: "8px",
              }}
            />
          )}
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
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
