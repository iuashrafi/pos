const mongoose = require("mongoose");

/**
 * User Model === Organization
 * Defining the schema for the User model.
 */
const userSchema = new mongoose.Schema(
  {
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide an email address."],
    },
    password: { type: String, required: [true, "Please enter your password."] },
    name: { type: String, required: [true, "Please enter your name."] },
    username: { type: String }, // Optional username field
    role: {
      type: String,
      required: [true, "Please select a role"],
      enum: {
        values: [
          "ADMIN",
          "CUSTOMER",
          "KITCHEN_MANAGER",
          "SALES_MANAGER",
          "ORDER_MANAGER",
        ],
        message: "Please select a valid role.",
      },
      default: "ADMIN",
    },
  },
  {
    timestamps: true, // Automatic timestamps for createdAt and updatedAt fields
  }
);

// Creating the User model from the schema
const User = mongoose.model("User", userSchema);

// Exporting the User model
module.exports = User;
