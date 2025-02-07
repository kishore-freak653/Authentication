import  jwt  from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

// Function to verify and decode JWT token
export const generatetoken = (id) => {

  // Replace 'secretKey' with your own secret key
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
  return token;
};