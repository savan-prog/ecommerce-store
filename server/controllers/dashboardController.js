import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();

    const pendingOrders = await Order.countDocuments({
      status: "Pending",
    });
    res.status(200).json({
      success: true,
      totalProducts,
      totalUsers,
      totalOrders,
      pendingOrders,
    });
    res.status(500).json({
      success: false,
      message: error.message,
    });
  } catch (error) {}
};
