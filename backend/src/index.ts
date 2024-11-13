import "reflect-metadata";
import express from "express";
import cors from "cors";
// import { findAll } from "./models/AdManager";

import { datasource } from "./datasource";
import { Category } from "./entities/Category";
import { Ad } from "./entities/Ad";
import { router as AdsRouter } from "./controllers/adsController";
import { router as CategoriesRouter } from "./controllers/categoriesController";
import { router as TagsRouter } from "./controllers/tagsController";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
}))

app.use("/ads", AdsRouter);
app.use("/categories", CategoriesRouter);
app.use("/tags", TagsRouter);

async function initiliaze() {
  await datasource.initialize();
  console.log("Datasource is connected 🔌");

  app.listen(port, () => {
    console.log(`Listening on port : ${port} 🚀`);
  });
}

initiliaze();
