const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const SingerSchema = require('./models/Singer')
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

const Singer = mongoose.model('singer',SingerSchema)

app.get('/',(req,res)=>{
    Singer.find()
    .then(singers=>{
        res.render('list',{singers})
    })
    .catch(e=>console.log(e.message))
})
app.get('/add',(req,res)=>{
    res.render('add')
})


app.listen(3000,()=>console.log('Server start on port 3000'))