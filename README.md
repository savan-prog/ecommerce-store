# 🛒 MERN E-Commerce Store

A full-stack e-commerce web application built using the **MERN stack** with user authentication, product management, shopping cart, order management, and an admin dashboard.

## 🚀 Live Demo

**Frontend:** https://savan-mern-ecommerce.netlify.app/

**Backend API:** https://ecommerce-store-xf6d.onrender.com

**GitHub Repository:** https://github.com/savan-prog/ecommerce-store

## ✨ Features

### 👤 User Features

* User registration and login
* Secure password hashing using bcrypt
* JWT-based authentication
* Browse products
* View product details
* Add products to cart
* Update cart quantities
* Remove products from cart
* Place orders
* View order information

### 👨‍💼 Admin Features

* Admin authentication
* Admin dashboard
* Manage products
* Add new products
* Update product details
* Delete products
* Manage users
* Manage orders
* View order details

## 🛠️ Tech Stack

### Frontend

* React.js
* Redux Toolkit
* React Redux
* React Router DOM
* Axios
* Bootstrap 5
* Font Awesome
* Vite

### Backend

* Node.js
* Express.js
* REST API
* JWT (JSON Web Token)
* bcrypt
* CORS
* dotenv

### Database

* MongoDB
* Mongoose
* MongoDB Atlas

### Deployment

* Frontend: Netlify
* Backend: Render
* Database: MongoDB Atlas

## 🔐 Authentication

The application uses:

* **bcrypt** for secure password hashing
* **JWT** for authentication and protected routes
* Role-based access for admin functionality

## 🗂️ Project Structure

```text
ecommerce-store/
│
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── server/
│   ├── configure/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── server.js
│
├── .gitignore
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/savan-prog/ecommerce-store.git
cd ecommerce-store
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm start
```

The backend will run locally at:

```text
http://localhost:5000
```

### 3. Setup Frontend

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

The frontend will run on the Vite development server.

## 🔑 Environment Variables

The backend requires the following environment variables:

| Variable     | Description                            |
| ------------ | -------------------------------------- |
| `PORT`       | Backend server port                    |
| `MONGO_URI`  | MongoDB database connection string     |
| `JWT_SECRET` | Secret key used for JWT authentication |

> **Note:** Never commit your `.env` file or secret credentials to GitHub.

## 🌐 Production Deployment

The application is deployed using:

* **Frontend:** Netlify
* **Backend:** Render
* **Database:** MongoDB Atlas

### Production URLs

**Frontend:**
https://savan-mern-ecommerce.netlify.app/

**Backend:**
https://ecommerce-store-xf6d.onrender.com

The React frontend communicates with the deployed Express backend through REST API endpoints.

## 📌 Key Concepts Demonstrated

* Full-stack MERN development
* REST API development
* React component-based architecture
* State management using Redux Toolkit
* Client-side routing
* JWT authentication and authorization
* Password hashing with bcrypt
* CRUD operations
* MongoDB database operations
* Express middleware
* API integration using Axios
* Responsive UI development
* Frontend and backend deployment

## 👨‍💻 Author

**Savan**

MERN Stack Developer
