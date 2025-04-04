
const {GetAll,createNew,updates,deletes}=require('../controllers/products')
const express=require('express')
const router=express.Router()

router.route('/').get(GetAll).post(createNew)
router.route('/:id').patch(updates).delete(deletes)

module.exports= router