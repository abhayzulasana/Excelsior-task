import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouters from "./router/userRoutes.js";

const app = express();


app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://localhost:27017/user-registration", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/users", userRouters);

app.listen(5000, () => console.log("Server started on port 5000"));
