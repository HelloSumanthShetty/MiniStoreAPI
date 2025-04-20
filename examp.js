const mongoose=require("mongoose")
const express=require("express")
const app=express()
app.use(express.json())
const connectDB=mongoose.connect("mongodb+srv://sumanthShetty:sumanthsumanth@cluster0.2wqtq.mongodb.net/example?retryWrites=true&w=majority&appName=Cluster0")

const schema=new mongoose.Schema({
    user:String,
    email:String,
    password:String
})

const mod=mongoose.model("User",schema)

app.post('/', async function(req,res){
    const user=req.body.user
    const password=req.body.password
    const email=req.body.email

    const existUser=await mod.findOne({email})
    if(existUser){
        return res.status(300).json("email is already used")
    }


    const users=new mod({
        user:user,
        password:password,
        email:email
    })
    users.save()

res.json({msg:"user created"})
})
app.listen(3000,console.log("server is listening on 3000"))