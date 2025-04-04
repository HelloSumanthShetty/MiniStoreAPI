const API=require('../models/product')


const GetAll=async(req,res)=>{
    try {
     const findAll= await API.find({})
     res.status(201).json(findAll)
    } catch (error) {
        res.status(404).json(error)
    }

}


const createNew=async(req,res)=>{
    try {
     const findAll= await API.create(req.body)
     res.status(201).json(findAll)
    } catch (error) {
        res.status(404).json(error)
    }

}



const updates=async(req,res)=>{
    try {
        const {id:upd}=req.params
     const update= await API.findOneAndUpdate({_id:upd},req.body,{
        new:true,
        runValidators:true
     })
    if(!update){
        res.status(404).json({msg:`can the the id ${del}`})
    }
     res.status(201).json(update )
    } catch (error) {
        res.status(404).json({msg:"there is an error in the input"})
    }

}
const deletes=async(req,res)=>{
    try {
        const {id:del}=req.params
        const deletess= await API.findOneAndDelete({_id:del})
        if(!deletes){
            res.status(404).json({msg:`can the the id ${del}`})
        }
        res.status(201).json(deletess)
       } catch (error) {
           res.status(404).json(error)
       }
    }

module.exports={
    GetAll,
    createNew,
    updates,
    deletes
}