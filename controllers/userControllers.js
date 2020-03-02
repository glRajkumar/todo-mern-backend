let express = require('express')
let router = express.Router()
// let bcrypt = require('bcrypt')
let User = require('../models/User')
let jwt = require('jsonwebtoken')
let auth = require('../middlewares/auth')

router.post('/register', (req,res)=>{
    let {name, email, password} = req.body

    let user = new User({email , name, password : hash})
       
    user.save().then(()=>{
        res.send("User Saved successfully")
    })
    .catch(()=>{
        res.status(400).send("User creation failed")
    })

    // bcrypt.hash(password, 10)
    // .then((hash)=>{
    //     let user = new User({email , name, password : hash})
       
    //     user.save().then(()=>{
    //         res.send("User Saved successfully")
    //     })
    //     .catch(()=>{
    //         res.status(400).send("User creation failed")
    //     })
    // })
    // .catch((err)=>{
    //     console.log(err);
    //     res.status(400).send("Some error with hashing")
    // })    
})

router.get('/me', auth, (req,res)=>{
   res.send(req.user)
})

router.post('/login', (req, res)=>{
    let {email, password} = req.body

    User.findOne({email})
    .then((user)=>{
    //console.log(user)
       
    let payload = {userId : user._id}
    let token = jwt.sign(payload, "secret", {expiresIn : '18h'})

    user.token = user.token.concat([token])

    user.save().then(()=>{
          res.send({token})
    })
    .catch(err => {
        res.status(400).send('Token not saved to DB')
    })
    })
    .catch((error)=>{
     res.status(401).send("cannot find user in db")
    })
})

router.post("/logout", auth, (req, res)=>{
     let user = req.user
     let token = req.token
     
    user.token =  user.token.filter(t => t!=token)
    
    user.save().then(()=>{
        res.send('User Logged Out')
    }).catch(()=>{
        res.send("Some error in log out")
    })
})

module.exports = router