const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
   orders:{
    type:[],
    required:true
   },
   orderQty:{
    type:Number,
    required:true
   },
   orderAmt:{
    type:Number,
    required:true
   }
},{timestamps:true})

const Order = mongoose.model('Order',orderSchema);

module.exports = {Order}