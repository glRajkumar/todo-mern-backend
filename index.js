let express = require('express')
let app = express()
let cors = require('cors')

let db = require('./db')
let userControllers = require('./controllers/userControllers')
let todoControllers = require('./controllers/todoControllers')

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use("/user", userControllers)
app.use("/todo", todoControllers)

app.get("/",(req,res) => {
    res.send("Hello World!")
})

const port = process.env.PORT || 8000
app.listen(port,()=>console.log(`App is running on ${port}`))