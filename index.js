const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')

const app = express()
app.set('view engine','ejs')
app.use(express.static('public'))

mongoose.connect('mongodb://localhost:27017/singer1602',{
    useNewUrlParser:true,
    useCreateIndex:true,
})
mongoose.connection
.then(()=>console.log('Connected'))
.catch(e=>console.log(e))

app.listen(3000,()=>console.log('Server start on port 3000'))