let mongoose = require('mongoose')

let uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/test'
mongoose.connect(uri, {
    useUnifiedTopology : true,
    useNewUrlParser : true
})
.then(()=>{
    console.log("MongoDB is connected now")
}).catch(()=>{
    console.log("cant connect to db")
}) 