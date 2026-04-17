import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import authRoutes from "./routes/authRoutes.js";


dotenv.config();

// Connect database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/test-user", async (req, res) => {
  const user = await User.create({
    username: "testuser",
    email: "test@test.com",
    password: "123456",
  });

  res.json(user);
});



// Port
const PORT = process.env.PORT || 6000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});