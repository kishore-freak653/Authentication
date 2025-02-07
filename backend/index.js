import express from "express";
import connectDB from "./db/db.js";
import cors from "cors";

const app = express();
// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to enable CORS  
app.use(cors(
  {
    origin: "http://localhost:5174",//low requests from this origin
    credentials: true, // allow cookies
  }
));
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});
connectDB();

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});




// Importing routes
import AuthRoutes from "./routes/AuthRoutes.js";
app.use("/api/auth", AuthRoutes);
// Mock API endpoints
