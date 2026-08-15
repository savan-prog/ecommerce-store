import express from "express";
// import .env (port number)
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import connectDB from "./configure/db.js";
dotenv.config();

//create server
const app = express();

//call the connectDB function (configure folder ke andar db.js file mai bnaaya hai)
connectDB();

//frontend ko backend se connect krne ke liye
app.use(cors());

// Middleware (Built-in hota hai express mai)
app.use(express.json());

// product route
app.use("/api/products", productRoutes);

//user route
app.use("/api/users", userRoutes);

//order route
app.use("/api/orders", orderRoutes);

//dashboard router
app.use("/api/dashboard", dashboardRoutes);

//port number ke liye
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("server is running");
});

//listen server on port
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
