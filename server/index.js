import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import RecipesRouter from "./routes/api/RecipesRouter.js";
import homeRouter from "./routes/homeRouter.js";
import assetsRouter from "./routes/assetsRouter.js";

const app = express();
const publicPath = path.join(path.resolve(), "../client/public");
const distPath = path.join(path.resolve(), "../client/dist");
const serverPath = path.join(path.resolve(), "../server/uploads");
const assetsPath = path.join(path.resolve(), "../client/src/assets");

dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB database connected!"))
  .catch((err) => console.log(err));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(distPath));
} else {
  app.use("/", express.static(publicPath));
  app.use("/src", assetsRouter);
}
app.use("/assets", express.static(assetsPath));
app.use("/uploads", express.static(serverPath));

app.use("/foodnouvaeu/api", RecipesRouter);
app.use(homeRouter);

app.listen(process.env.PORT, () => {
  console.log(`App is running on http://localhost:${process.env.PORT}`);
});
