
const mongoose =require("mongoose")
const schema=new mongoose.Schema({
    originalUrl:{
        type:String,
        required:true
    },
    shortUrl:{
        type:String,
        required:true,
        unique:true
    }
})

const Url=mongoose.model('url',schema)
module.exports=Url