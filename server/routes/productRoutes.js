import express from "express";
import {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router(); //Ye sirf ek Router Object banata hai.

router.get("/", getAllProducts);

router.get("/:id", getSingleProduct);

router.post("/", protect, adminOnly, createProduct);

router.put("/:id", protect, adminOnly, updateProduct);

router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;

/* "express.Router() Express ka built-in feature hai jo related routes ko ek module me organize karne ke liye use hota hai. Ye ek mini router object create karta hai jise baad me app.use() ke through main Express application me mount kiya jata hai."

Mount ka simple matlab hai: Attach (jodna) ya Connect karna. Router ko Main Express App ke saath attach karna. */
