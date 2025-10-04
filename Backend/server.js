const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/books", require("./routes/books"));
app.use("/api/reviews", require("./routes/reviews"));

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(()=>console.log("MongoDB connected"))
  .then(()=>app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`)))
  .catch(err=>console.log("DB Error:", err));
