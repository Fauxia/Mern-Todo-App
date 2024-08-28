import express from "express";
import dotenv from "dotenv";
import { connectToDb } from "./config/db.js";
import { productRouter } from "./routes/product.route.js";
import path from "path";

dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use("/api", productRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/frontend/dist/index.html"));
  });
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  connectToDb();
  console.log(`Server running at Port ${PORT}`);
});
