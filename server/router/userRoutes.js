import express from "express";
import mongoose from "mongoose";
import User from "../model/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  console.log("Received POST request with body:", req.body); // Log full body

  try {
    const { fullname, dob, gender, email, mobile, password } = req.body;
    if (!fullname || !dob || !gender || !email || !mobile || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const age = new Date().getFullYear() - new Date(dob).getFullYear();
    if (age < 18) {
      return res.status(400).json({ error: "User must be 18+" });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const newUser = new User({ fullname, dob, gender, email, mobile, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ error: "Server error" });
  }
});



router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;