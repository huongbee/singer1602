const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const SingerSchema = require('./models/Singer')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/images')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'-'+file.originalname)
    }
})
const fileFilter = (req, file, cb)=>{
    if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg')
        return cb(new Error('File not allow'))
    cb(null, true)
}

const upload = multer({storage,fileFilter, limits:{fileSize:102400}}) // 100kb

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
app.post('/add',(req,res)=>{
    upload.single('avatar')(req,res,err=>{
        if(err){
            return res.send(err.message)
        }
        const { name, link } = req.body
        Singer.create({
            name: name ,
            link: link,
            avatar: req.file.filename
        })
        .then(()=>{
            res.redirect('/')
        })
        .catch(e=>console.log(e.message))
    })
})


app.listen(3000,()=>console.log('Server start on port 3000'))