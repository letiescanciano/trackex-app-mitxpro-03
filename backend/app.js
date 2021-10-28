const express = require("express");
const app = express();

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

// REST API - CRUD (Create, Read, Update, Delete)

// Read all
app.get("/transactions", (req, res) => {
  const transactions = db.get("transactions").value();
  console.log(transactions);
  res.status(200).json(transactions);
  //   response.send("<h1>Hola</h1><ul><li>list 1</li></ul>");
});

//Create a transaction
app.post("/transactions", (req, res) => {});

//Update a transaction
app.put("/transactions/:id", (req, res) => {});

//Delete a transaction
app.delete("/transactions/:id", (req, res) => {});
app.listen(3001, () => console.log("Server listening on port 3001"));
