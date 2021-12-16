require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const firebase = require('./config/firebase')
const User = require('./models/User')
const Transaction = require('./models/Transaction')

const decodeToken = require('./middlewares/auth')
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

app.use(decodeToken)
// Read all
app.get('/transactions', async (req, res) => {
  console.log(req.headers)
  try {
    const user = await User.findOne({ firebaseId: req.user.uid })
    const transactions = await Transaction.find({ userId: user._id })
    res.status(200).json(transactions)
  } catch (err) {
    res.status(404).json({ message: 'Bad request' })
  }
})

// //Create a transaction
app.post('/transactions', async (req, res) => {
  console.log('body', req.body)
  const { name, date, amount, category, type } = req.body
  const user = await User.findOne({ firebaseId: req.user.uid })

  const newTransaction = {
    name,
    date,
    amount,
    category,
    type,
    userId: user._id,
  }
  try {
    const createdTransaction = await Transaction.create(newTransaction)
    console.log(createdTransaction)
    if (createdTransaction) {
      res.status(201).json(createdTransaction)
    }
  } catch (err) {
    console.log(err)
  }
})

// //Update a transaction
app.put('/transactions/:id', async (req, res) => {
  const { id } = req.params

  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      { new: true }
    )
    if (updatedTransaction) {
      res.status(200).json(updatedTransaction)
    } else {
      res.status(404).json({ message: 'Resource not found' })
    }
  } catch (err) {
    console.log(err)
  }

  if (updatedTransaction) {
    res.status(200).json(updatedTransaction)
  } else {
    res.status(404).json({ message: 'Resource not found' })
  }
})

// //Delete a transaction
app.delete('/transactions/:id', async (req, res) => {
  const { id } = req.params

  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(id)
    if (deletedTransaction) {
      res.status(200).json(deletedTransaction)
    } else {
      res.status(404).json({ message: 'Resource not found' })
    }
  } catch (e) {
    console.log(e)
  }
})
app.listen(3001, () => console.log('Server listening on port 3001'))
