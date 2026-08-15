import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI); //database se connect hone mai time leta hai esliye promise return krta hai to async/await lagaya
    //.env me jo MONGO_URI hai usse MongoDB se connection establish karo."
    console.log(conn);
    console.log(`MongoDB Connected : ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB Connection Failed");
    console.log(error.message);
    process.exit(1); //Agar database connect nahi hua to server ko band kar do." exit ke andar (1) hai to Program error ki wajah se band hua and 0 hai to successful hokar close hua program.
  }
};

export default connectDB;
