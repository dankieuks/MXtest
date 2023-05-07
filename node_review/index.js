import express from "express";

import { connectToDb, db } from "./db.js";
import inventoryRouter from "./Router/inventory.js";
const app = express();
connectToDb();

app.use(express.json());
app.use("/api/inventory", inventoryRouter);

app.listen(8080, () => {
  console.log("App is running at 8080");
  connectToDb();
});
