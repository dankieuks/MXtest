import express from "express";
import { connectToDb, db } from "../db.js";
import { inventoriesCollection } from "../db.js";
const inventoryRouter = express.Router();

connectToDb();

inventoryRouter.get("/", async (req, res) => {
  try {
    const inventories = await inventoriesCollection.find().toArray();
    res.status(200).json({
      message: "Success",
      data: inventories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Fail",
      data: null,
    });
  }
});
inventoryRouter.get("/instock", async (req, res) => {
  try {
    const inventories = await inventoriesCollection
      .find({ instock: { $lt: 100 } })
      .toArray();
    res.status(200).json({
      message: "Success",
      data: inventories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Fail",
      data: null,
    });
  }
});

export default inventoryRouter;
