const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter an appropriate name"],
        trim:true,
        maxlength : [20,"The length of should be below 30 char"]
    }
})
module.exports=mongoose.model("API",schema)