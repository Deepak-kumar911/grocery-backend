const express = require('express');
const app = express()
const mongoose = require('mongoose');
require('dotenv').config()
const cors = require('cors');
const category = require('./routes/category')
const product = require('./routes/product')
const order = require('./routes/order');


mongoose.connect(process.env.DATABASE_URL)
.then(()=>console.log("successfull connected")
)
.catch((err)=>console.log(`failed to connect ${err}`))


//middleware
app.use(cors())
app.use(express.json())
app.use("/api/category",category);
app.use("/api/product",product);
app.use("/api/order",order);

app.get("/",async(req,res)=>{
    try {
        res.status(200).send("backend working...")
    } catch (err) {
        console.log(err);
    }
})

app.listen(process.env.PORT,()=>{
    console.log(`listening to ${process.env.PORT} `)});
