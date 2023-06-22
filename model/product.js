const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    details:{
        type:String,
        required:true
    }
    
},{timestamps:true})

const Product = mongoose.model('Product',productSchema);

module.exports = {Product};