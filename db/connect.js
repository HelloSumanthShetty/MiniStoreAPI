const mongoose=require('mongoose')

const connectDB= async(url)=>{
  console.log("...trying to connected to DB")
  const db=await mongoose.connect(url)
 console.log("CONNECTED")
}
module.exports=connectDB