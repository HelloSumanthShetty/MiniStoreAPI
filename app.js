const express=require("express")
const app=express()
const notFound=require('./middleware/not-found')
const router=require('./routes/products')
require("dotenv").config()
const connectDB=require('./db/connect')
app.use(express.json())
app.use('/api',router)



const start=async ()=>{
    try {
        await connectDB(process.env.url)
    } catch (error) {
        console.log(error)
    }
}
start()
app.use(notFound)
app.listen(3000)