import express from "express";
import dotenv from "dotenv";
import { connectToDb } from "./config/db.js";
import { productRouter } from "./routes/product.route.js";
import path from "path";
import cors from "cors";

dotenv.config();



const app = express();

app.use(cors());
const __dirname = path.resolve();

app.use(express.json());
app.use("/api", productRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  connectToDb();
  console.log(`Server running at Port ${PORT}`);
});
