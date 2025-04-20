
const { model } = require("mongoose")
const connectDB=require("./db/connect")
const api=require("./models/product")
const jsonprod=require("./products.json")
require("dotenv").config()

const add=async (req,res)=>{
 const mongodb=process.env.urls
 try {
    await connectDB(mongodb)
    const prodexit=await api.countDocuments()
    if(prodexit>0){
        console.log("works fine")
    return
    }
    await  api.insertMany(jsonprod)
    console.log("success")
    return

    
 } catch (error) {
    console.log(error)
    process.exit(1)
 }
     
}
module.exports={
    add
}