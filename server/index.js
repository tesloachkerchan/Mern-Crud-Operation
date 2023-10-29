const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')

const app = express()
//middle ware
app.use(cors())
app.use(express.json())
//connect to database
mongoose.connect("mongodb://127.0.0.1:27017/crude")
    .then(() => {
    console.log("mongodb is connected successfully!")
    })
    .catch((err) => console.log("fail to connect!:" + err))
//fetch data from db and send to client
app.get('/', (req, res) => {
    UserModel.find({})
        .then((result) => res.json(result))
        .catch(err => console.log(err))
})
//get user by id
app.get('/getUser/:id', (req, res) => {
    const id = req.params.id
    UserModel.findById({_id: id })
        .then((result) => res.json(result))
        .catch(err => console.log(err));
})
//update user
app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id
    UserModel.findByIdAndUpdate({ _id: id, }, {
        name: req.body.name,
        email: req.body.email,
        age:req.body.age
    })
        .then((result) => res.json(result))
        .catch(err => console.log(err))
    
})
//delete user
app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id
    UserModel.findByIdAndDelete({ _id: id })
        .then((result) => res.json(result))
        .catch(err => console.log(err))
    })
//create user
app.post('/createUser', (req, res) => {
    UserModel.create(req.body)
        .then((users) => res.json(users))
        .catch((err) => res.json(err))
})

app.listen(3001, () => {
    console.log("server is running on port:3001")
})