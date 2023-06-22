const router = require('express').Router();
const {Category} = require('../model/category')

router.post("/",async(req,res)=>{
    try {
        const category = await new Category({
            name:req.body.name,
        })
       await category.save()
       res.status(201).send(category)
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
})

router.get("/all",async(req,res)=>{
    try {
        const category = await Category.find().select("-__v");
        res.status(200).send(category)
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
})

module.exports = router;