const API=require('../models/product')
const {jsonpop}=require('../populate')
const add=require('../products.json')
const GetAll=async(req,res)=>{
    try {
      const total=await API.countDocuments()  
     const findAll= await API.find({})
     res.status(201).json({Totalproducts:total,findAll})
    } catch (error) {
        res.status(404).json(error)
    }

}

const creates=async (req,res)=>{
    try {
        const newProducts=req.body
        const make=await API.create(newProducts)
        res.status(200).json(make)    
    } catch (error) {
      res.status(500).json(error)
    }
    
}


const createNew=async(req,res)=>{
    try {
     const findAll= await API.create(add)
     res.status(201).json(findAll)
    } catch (error) {
        res.status(404).json(error)
    }

}



// const updates=async(req,res)=>{
//     try {
//         const {id:upd}=req.params
//      const update= await API.findOneAndUpdate({_id:upd},req.body,{
//         new:true,
//         runValidators:true
//      })
//     if(!update){
//         res.status(404).json({msg:`can the the id ${del}`})
//     }
//      res.status(201).json(update )
//     } catch (error) {
//         res.status(404).json({msg:"there is an error in the input"})
//     }

// }
const updates=async(req,res)=>{
    try {
        const {id }=req.params;
    const result= await API.findByIdAndUpdate(id,req.body,{
        runValidators:true,
        new:true
    })
    if(!result){
        res.status(200).json(`cannot find  the id ${id}`)
    }
    res.json(result)
    } catch (error) {
        res.status(500).json(e)
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

    const end=async (req,res)=>{
        try{
        await API.deleteMany(jsonpop)
      
       res.status(200).json("old Database is cleaned")
        }
        catch(e)
        {
       res.status(404).json("something when wrong")
        }
    }
    

   const maincontrol=async(req,res)=>{
    const{featured,company,name,sorting,field,numericfilter}=req.query;
    const queryarray={}
    if(featured){
        //mongodb featured is stored as string
        queryarray.featured=featured=="true"?true:false 
    }
    if(company){
    queryarray.company=company
    }
    if(name){
        queryarray.name={$regex:name , $options: 'i'}
 
    }
    if (numericfilter) {
        const operations = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte'
        };
        const regEX = /\b(>|>=|=|<|<=)\b/g;

        let filter = numericfilter.replace(regEX, (match) => {
            return `-${operations[match]}-`;
        });

        const options = ["price", "rating"]; // fields allowed to do numeric filters on

        filter.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            if (options.includes(field)) {
                if (!queryarray[field]) {
                    queryarray[field] = {};
                }
                queryarray[field][operator] = Number(value);
            }
        });
    }

   
    let query= API.find(queryarray)
    if(sorting){
        const sorted=sorting.split(',').join(' ')
        query=query.sort(sorted)
    } 
    if(field){
        const fields=field.split(',').join(' ')
        query=query.select(fields)
    }
    const page=Number(req.query.page) || 1
    const limit =Number(req.query.limit) ||10 
    const skip=(page-1)*limit


      query=query.skip(skip).limit(limit)
    const total = await API.countDocuments(queryarray);
    const results =  await query;
  
    res.status(200).json({ total, results });
  };
module.exports={
    GetAll,
    creates,
    createNew, 
    maincontrol,
    updates,
    deletes,
    end
}  