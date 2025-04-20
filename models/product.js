const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter an appropriate name"],
        trim:true,
        maxlength : [30,"The length of should be below 30 char"]
    },
    price:{
      type:Number,
      required:[true,"please enter the price"]
    },
    company:{
        type:String,
        enum:{
               values: ['ikea','caressa','liddy','marcos','nike','jorden','puma','levis','titan','rolex','fastrack'],
        message:'{values} is not present'
        }
    },
    featured:{
        type:Boolean,
        default:false,
    },
    rating:{
        type:Number,
        default:4.0
    },
    createdate:{
       type:Date,
       default:Date.now()
    }

})
module.exports=mongoose.model("API",schema) 