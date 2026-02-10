const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use("/assets", express.static(path.join(__dirname, "frontend", "assets")));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use(express.static(path.join(__dirname, "frontend")));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "frontend", "index.html"))
);
app.get("/login", (req, res) =>
  res.sendFile(path.join(__dirname, "frontend", "login.html"))
);
app.get("/product", (req, res) =>
  res.sendFile(path.join(__dirname, "frontend", "product.html"))
);
app.get("/profile", (req, res) =>
  res.sendFile(path.join(__dirname, "frontend", "profile.html"))
);
app.get("/register", (req, res) =>
  res.sendFile(path.join(__dirname, "frontend", "register.html"))
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
