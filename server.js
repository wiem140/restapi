const express = require('express')
const app = express()
require('dotenv').config({path:'./config/.env'})
const PORT=6000
app.listen(PORT,function(){console.log('server is running')})
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {console.log('Database connection successful')}).catch(err => {console.error('Database connection error')})
app.use(express.json())



const UserDB = require('./models/User')

const mongoose=require('mongoose')



mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {console.log('Database connection successful')}).catch(err => {console.error('Database connection error')})

// Get All Users
app.get('/users', (req, res) => {
    UserDB.find()
    .then(users => res.status(200).send(users))
    .catch(error => res.status(400).send({error}))
}) 

// Get User by id
app.get('/users/:id', (req, res) => {
    UserDB.find({_id: req.params.id})
    .then(users => res.status(200).send(users))
    .catch(error => res.status(400).send({error}))
}) 

// Add new user to DB
app.post('/users', (req, res) => {
    const User = new UserDB({name: req.body.name, age: req.body.age})
    User.save()
    .then(() => res.status(200).send({ message : 'User added'}))
    .catch(error => res.status(400).send({error}))
})

// Edit user by id
app.put('/users/:id', (req, res) => {
    UserDB.findOneAndUpdate({ _id: req.params.id}, { $set: {...req.body}} )
    .then(() => res.status(200).send({ message : 'User modified'}))
    .catch(error => res.status(400).send({error}))

})

// Remove user by id
app.delete('/users/:id', (req, res) => {
    UserDB.findOneAndDelete({_id: req.params.id})
    .then(() => res.status(200).send({ message : 'User removed'}))
    .catch(error => res.status(400).send({error}))
})



