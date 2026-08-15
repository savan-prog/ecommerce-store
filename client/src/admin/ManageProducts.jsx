import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/manage-products.css";
import { useNavigate } from "react-router-dom";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  //selectedProduct state is for showing product detail in modal on view button clik
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data.products);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  //Delete Product
  const deleteProduct = async (id) => {
    const confirmDelete = confirm("Are you sure want to delete this Product?");

    if (!confirmDelete) {
      return;
    }
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Product Deleted Successfully");
      getProducts();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  //
  const handleView = (product) => {
    setSelectedProduct(product);
  };
  return (
    <div className="manage-products">
      <div className="main-topbar">
        <div className="page-header">
          <h2>Dashboard</h2>
          <div className="breadcrumb">
            <span>Dashboard</span>
            <span>/ Products</span>
            <span>/ Manage Products</span>
          </div>
        </div>
      </div>
      <div className="table-container">
        <h2>Manage Products</h2>
        <table className="product-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="manage-product-image"
                  />
                </td>
                <td>{product.title}</td>
                <td>{product.category}</td>
                <td>₹ {product.price}</td>
                <td>{product.rating} ⭐</td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => handleView(product)}
                    data-bs-toggle="modal"
                    data-bs-target="#viewProductModal"
                  >
                    View
                  </button>
                  <button
                    className="edit-btn"
                    onClick={() =>
                      navigate(`/admin/edit-product/${product._id}`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          className="modal fade"
          id="viewProductModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Product Details</h5>

                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              <div className="modal-body">
                {selectedProduct && (
                  <>
                    <div className="text-center mb-3">
                      <img
                        src={selectedProduct.image}
                        alt={selectedProduct.title}
                        style={{
                          width: "180px",
                          borderRadius: "10px",
                        }}
                      />
                    </div>

                    <p>
                      <strong>Title :</strong> {selectedProduct.title}
                    </p>

                    <p>
                      <strong>Category :</strong> {selectedProduct.category}
                    </p>

                    <p>
                      <strong>Price :</strong> ₹ {selectedProduct.price}
                    </p>

                    <p>
                      <strong>Rating :</strong> ⭐ {selectedProduct.rating}
                    </p>

                    <p>
                      <strong>Description : </strong>
                      {selectedProduct.description}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ManageProducts;
