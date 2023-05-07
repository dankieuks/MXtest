import { MongoClient } from "mongodb";

const db = {
  orders: [
    { id: 1, item: "almonds", price: 12, quantity: 2 },
    { id: 2, item: "pecans", price: 20, quantity: 1 },
    { id: 3, item: "pecans", price: 20, quantity: 3 },
  ],

  inventories: [
    { id: 1, sku: "almonds", description: "product 1", instock: 120 },
    { id: 2, sku: "bread", description: "product 2", instock: 80 },
    { id: 3, sku: "cashews", description: "product 3", instock: 60 },
    { id: 4, sku: "pecans", description: "product 4", instock: 70 },
  ],

  users: [
    { username: "admin", password: "MindX@2022" },
    { username: "alice", password: "MindX@2022" },
  ],
};

const client = new MongoClient(
  "mongodb+srv://web_65:7vIC6ZHyo3CpZ7rS@cluster0.sugjv2y.mongodb.net/test"
);
const database = client.db("testk3");

export const ordersCollection = database.collection("orders");
export const inventoriesCollection = database.collection("inventories");
export const usersCollection = database.collection("users");

const connectToDb = async () => {
  try {
    await client.connect();
    await ordersCollection.insertMany(db.orders);
    await inventoriesCollection.insertMany(db.inventories);
    await usersCollection.insertMany(db.users);
    return { ordersCollection, inventoriesCollection, usersCollection };
  } catch (err) {
    // console.error(err);
  }
};

export { connectToDb, db, client };