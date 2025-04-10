import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    
    fullname: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
  },

);

const User = mongoose.model("User", userSchema);

export default User; 
