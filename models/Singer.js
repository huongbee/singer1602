const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SingerSchema = new Schema({
    name:{
        type:String, 
        required:true
    },
    avatar: String,
    link: String,
    created_at: {
        type: Date, 
        default:Date.now()
    }
})
module.exports = SingerSchema