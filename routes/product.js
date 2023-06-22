const router = require('express').Router();
const {Product} = require('../model/product')
const {Category} = require('../model/category')

router.post("/createNew",async(req,res)=>{
    try {
         const category = await Category.findById(req.body.categoryId)
         if(!category) return res.status(404).send("category not found")
         console.log(category);
        const product = await new Product({
            name:req.body.name,
            category:category.name,
            stock:req.body.stock,
            price:req.body.price,
            details:req.body.details
        })
       await product.save()
       res.status(201).send(product)
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
})

router.get("/all",async(req,res)=>{
    try {
       const products = await Product.find().select("-createdAt -updatedAt -__v")
       res.status(201).send(products)
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
})

module.exports = router;