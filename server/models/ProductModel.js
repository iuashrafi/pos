const mongoose = require("mongoose");
/**
 * Product model
 */
const productSchema = new mongoose.Schema(
  {
    // owner_id signifies the user id(or the organization id) under which the user_id is working
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide an organization id."],
    },
    // user_id signifies the user who has added the product
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide your user id."],
    },
    name: {
      type: String,
      required: [true, "Please enter your product name."],
    },
    description: String,
    image_url: [String],
    price: {
      type: Number,
      default: 0,
    },
    category: String,
    stocks: {
      type: Number,
      default: 0,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    more_details: mongoose.Schema.Types.Mixed, // Store any JSON-like structure here
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;
