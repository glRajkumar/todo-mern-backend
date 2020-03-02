let express = require('express')
let router = express.Router()
let ToDo = require('../models/ToDo')
let auth = require('../middlewares/auth')

router.post('/', auth, (req, res)=>{
    let {title, description} = res.body
    //let {creator} = res.body
    let creator = req.user._id
    let createDateTime = new Date()
    let done = false
    
    let todo = new ToDo({title, description, creator, createDateTime, done})

    todo.save().then(()=>{
        res.send("ToDo is added Successfully")
    })
    .catch((error)=>{
       res.status(400).send(err)
    })
})

router.put('/', (req, res)=>{
    let {id} = req.body
    ToDo.findOneAndUpdate({"_id": id}, {done: true})
    .then(()=>{res.send("ToDo is Updated")})
    .catch((err)=>{res.status(400).send(err)}) 
})

router.delete('/', (req, res)=>{
    let {id} = req.body
    ToDo.findByIdAndDelete({"_id": id})
    .then(()=>{res.send("ToDo is deleted")})
    .catch((err)=>{res.status(400).send(err)}) 
})

router.get('/', auth, (req, res)=>{
    let userId = req.user._id

    ToDo.find({"_id": userId})
    .then((todos)=>{res.send(todos)})
    .catch((err)=>{res.status(400).send(err)})
})

module.exports = router