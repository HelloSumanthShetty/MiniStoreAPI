
const {GetAll,creates,maincontrol,createNew,updates,deletes,end}=require('../controllers/products')
const express=require('express')
const router=express.Router()

router.route('/').get(GetAll).post(creates).delete(end)
router.route('/:id').patch(updates).delete(deletes)
router.route('/index').post(createNew).get(maincontrol)
module.exports= router   