require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const firebase = require('./config/firebase')
const User = require('./models/User')
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: ${x.connections[0].name}`)
  })
  .catch(err => console.log(err))
const corsOptions = {
  origin: 'http://localhost:3000',
}
app.use(cors(corsOptions))
// REST API - CRUD (Create, Read, Update, Delete)

app.use(express.json()) // for parsing application/json

app.post('/signup', async (req, res) => {
  const { email, password } = req.body
  console.log(req.body)

  try {
    const firebaseUser = await firebase.auth().createUser({
      email,
      emailVerified: true,
      password,
      disabled: false,
    })
    console.log('firebaseUser', firebaseUser)

    const dbUser = await User.create({ email, firebaseId: firebaseUser.uid })

    console.log('dbUser', dbUser)
    if (dbUser) {
      res.status(200).json(firebaseUser)
    } else {
      res.status(404).json({ message: 'Bad request' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(e.message)
  }
})

// Read all
// app.get("/transactions", (req, res) => {
//   const transactions = db.get("transactions").value();
//   console.log(transactions);
//   res.status(200).json(transactions);
//   //   response.send("<h1>Hola</h1><ul><li>list 1</li></ul>");
// });

// //Create a transaction
// app.post("/transactions", (req, res) => {
//   console.log("body", req.body);
//   const { name, date, amount, category, type } = req.body;
//   const newTransaction = {
//     name,
//     date,
//     amount,
//     category,
//     type,
//     created_at: new Date(),
//     updated_at: new Date(),
//   };
//   const createdTransaction = db
//     .get("transactions")
//     .insert(newTransaction)
//     .write();

//   res.status(201).json(createdTransaction);
// });

// //Update a transaction
// app.put("/transactions/:id", (req, res) => {
//   const { id } = req.params;
//   const { name, date, amount, category, type } = req.body;

//   const updatedTransaction = db
//     .get("transactions")
//     .updateById(id, {
//       name,
//       date,
//       amount,
//       category,
//       type,
//       updated_at: new Date(),
//     })
//     .write();

//   if (updatedTransaction) {
//     res.status(200).json(updatedTransaction);
//   } else {
//     res.status(404).json({ message: "Resource not found" });
//   }
// });

// //Delete a transaction
// app.delete("/transactions/:id", (req, res) => {
//   const { id } = req.params;
//   const deletedTransaction = db.get("transactions").removeById(id).write();

//   if (deletedTransaction) {
//     res.status(200).json(deletedTransaction);
//   } else {
//     res
//       .status(404)
//       .json({
//         message: `Couldn't delete resource. Please try again`,
//         id,
//         tried_at: new Date(),
//       });
//   }
// });
app.listen(3001, () => console.log('Server listening on port 3001'))
