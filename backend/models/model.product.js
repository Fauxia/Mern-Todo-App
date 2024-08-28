import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      unique: true,
      type: String,
    },
    price: {
      required: true,
      type: String,
    },
    image: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Products", productSchema);

export default Product;
