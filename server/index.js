const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authMiddleware = require("./middlewares/authMiddleware");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", authMiddleware, require("./routes/projectRoutes"));
app.use("/api/tasks", authMiddleware, require("./routes/taskRoutes"));
app.use(errorHandler);

const port = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
