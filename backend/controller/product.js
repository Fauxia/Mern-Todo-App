import Product from "../models/model.product.js";
import mongoose from "mongoose";

const postHandleProduct = async (req, res) => {
  const { name, price, image } = req.body;
  if (!name || !price || !image) {
    res
      .status(400)
      .json({ success: false, message: "Please provide all the fields" });
  }
  try {
    const newProduct = new Product({
      name,
      price,
      image,
    });
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.log(`Error ${error.message}`);
    res.status(400).json({ message: "Internal server error" });
  }
};

const deleteHandleProduct = async (req, res) => {
  const Id = req.params.id;
  try {
    await Product.findByIdAndDelete(Id);
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Product not found" });
  }
};

const editDeletePost = async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "Invalid ProductId" });
  }
  try {
    await Product.findByIdAndUpdate(id, body);
    res.status(201).json({ message: "Product updated" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

const getHandleProduts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    res.status(200).json({ success: true, data: allProducts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getSingleProduct = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid ProductId" });
  }
  try {
    const singleProduct = await Product.findById(id);
    res.status(200).json({ success: true, data: singleProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export {
  postHandleProduct,
  deleteHandleProduct,
  editDeletePost,
  getHandleProduts,
  getSingleProduct,
};
