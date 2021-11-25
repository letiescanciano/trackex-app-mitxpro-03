const express = require("express");
const app = express();
const cors = require('cors')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

const lodashId = require('lodash-id')
db._.mixin(lodashId)

const corsOptions = {
  origin: 'http://localhost:3000',
}
app.use(cors(corsOptions))
// REST API - CRUD (Create, Read, Update, Delete)

app.use(express.json()); // for parsing application/json
// Read all
app.get("/transactions", (req, res) => {
  const transactions = db.get("transactions").value();
  console.log(transactions);
  res.status(200).json(transactions);
  //   response.send("<h1>Hola</h1><ul><li>list 1</li></ul>");
});

//Create a transaction
app.post("/transactions", (req, res) => {
  console.log("body", req.body);
  const { name, date, amount, category, type } = req.body;
  const newTransaction = {
    name,
    date,
    amount,
    category,
    type,
    created_at: new Date(),
    updated_at: new Date(),
  };
  const createdTransaction = db
    .get("transactions")
    .insert(newTransaction)
    .write();

  res.status(201).json(createdTransaction);
});

//Update a transaction
app.put("/transactions/:id", (req, res) => {
  const { id } = req.params;
  const { name, date, amount, category, type } = req.body;

  const updatedTransaction = db
    .get("transactions")
    .updateById(id, {
      name,
      date,
      amount,
      category,
      type,
      updated_at: new Date(),
    })
    .write();

  if (updatedTransaction) {
    res.status(200).json(updatedTransaction);
  } else {
    res.status(404).json({ message: "Resource not found" });
  }
});

//Delete a transaction
app.delete("/transactions/:id", (req, res) => {
  const { id } = req.params;
  const deletedTransaction = db.get("transactions").removeById(id).write();

  if (deletedTransaction) {
    res.status(200).json(deletedTransaction);
  } else {
    res
      .status(404)
      .json({
        message: `Couldn't delete resource. Please try again`,
        id,
        tried_at: new Date(),
      });
  }
});
app.listen(3001, () => console.log("Server listening on port 3001"));
