import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/manage-users.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");

  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://ecommerce-store-xf6d.onrender.com/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data.users);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  // view button functionality
  const handleView = (user) => {
    setSelectedUser(user);
  };

  //Delete user
  const deleteUser = async (id) => {
    const confirmDelete = confirm("Are you sure want to delete this user?");

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://ecommerce-store-xf6d.onrender.com/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("User Deleted Successfully");
      getUsers();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  //search functionality
  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  });
  // console.log(filteredUsers);
  return (
    <>
      <div className="manage-users">
        <div className="main-topbar">
          <div className="page-header">
            <h2>Dashboard</h2>
            <div className="breadcrumb">
              <span>Dashboard</span>
              <span>/ Users</span>
              <span>/ Manage Users</span>
            </div>
          </div>
        </div>
        <div className="table-container">
          <div className="user-top">
            <h3>All Users</h3>
            <input
              type="text"
              placeholder="Search User"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <table className="user-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => handleView(user)}
                      data-bs-toggle="modal"
                      data-bs-target="#viewUserModal"
                    >
                      View
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="modal fade" id="viewUserModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-warning">
              <h5 className="modal-title">User Details</h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              {selectedUser && (
                <>
                  <p>
                    <strong>Username :</strong> {selectedUser.name}
                  </p>

                  <p>
                    <strong>Email :</strong> {selectedUser.email}
                  </p>

                  <p>
                    <strong>Role :</strong> {selectedUser.role}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ManageUsers;
