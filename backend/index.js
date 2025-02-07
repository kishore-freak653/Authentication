import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

// Middleware to parse JSON request bodies
app.use(express.json());

// Mock API endpoints
