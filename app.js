const express=require("express")
const app=express()
const notFound=require('./middleware/not-found')
const router=require('./routes/products')
require("dotenv").config()
const connectDB=require('./db/connect')
const {add}=require("./populate")
// const deletes=require("./deletedb")
app.use(express.json())
app.use('/api',router)
const apps=async()=>{
 await add()
}
apps()
app.use(notFound)
app.listen(3000) 