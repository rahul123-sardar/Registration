import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },

    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Gender is required"],
    },

   address: {
  type: String,
  required: [true, "Address is required"],
},


    phone: {
      type: Number,
      required: [true, "Phone number is required"],
    },
  },
);

const User=mongoose.model("User", userSchema);
export default User;
