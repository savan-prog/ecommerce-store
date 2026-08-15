import axios from "axios";

const API = "http://localhost:5000/api/products";

export const getProducts = async () => {
  try {
    const res = await axios.get(API);
    //  console.log(res);
    return res.data;
  } catch (error) {
    throw error;
  }
};

//getSingleProduct
export const getSingleProduct = async (id) => {
  try {
    const res = await axios.get(`${API}/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
