import express from "express";
import {
  deleteHandleProduct,
  editDeletePost,
  getHandleProduts,
  getSingleProduct,
  postHandleProduct,
} from "../controller/product.js";

export const productRouter = express.Router();

productRouter.get("/products", getHandleProduts);
productRouter.get("/products/:id", getSingleProduct);
productRouter.post("/products", postHandleProduct);
productRouter.delete("/products/:id", deleteHandleProduct);
productRouter.put("/products/:id", editDeletePost);
