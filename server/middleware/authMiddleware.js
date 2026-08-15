import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    //authorization header se token lena (jo token server ke dwara dia gya tha login ke time)
    const authHeader = req.headers.authorization; //req.headers , express mai ek object hota hai
    // console.log(authHeader);
    /*      {
                    host: "localhost:5000",
                    "content-type": "application/json",
                    authorization: "Bearer eyJhbGciOiJIUzI1NiIs..."
                }            */

    //yadi user ne token bheja hi nhi login ke time to uske liye and yadi token bheja lekin uske aage token type :Bearer nhi bheja uske liye bhi
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token, authorization denied",
      });
    }

    //actual token ko bearer se alg karenge
    const token = authHeader.split(" ")[1];
    // console.log(token);

    //jwt verify karenge
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(process.env.JWT_SECRET);
    // console.log(decoded);

    //find user in database
    const user = await User.findById(decoded.id).select("-password");
    //.select("-password") :means ki Password ko response/document mai mat do. - means es password field ko exclude rakho response mai.

    //attach user in request (logged in user ka data)
    req.user = user;
    next(); //request ko aage bhejne ke liye controller ke pass
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Not Authorized",
    });
  }
};

//adminOnly
export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access only",
    });
  }
  next();
};
