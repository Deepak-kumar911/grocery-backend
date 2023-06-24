const router = require('express').Router();
const {Order} = require('../model/order')
const {Product} = require('../model/product')

router.post("/createOrder",async(req,res)=>{
     let checkOrder =true;
     let item = ""

    for(let i=0; i<req.body.orders.length; i++){
        const product = await Product.find({_id:req.body.orders[0]._id,stock:{$gte:req.body.orders[0].qty}})
        console.log("forloop",product);
        if(product.length===0){
            checkOrder = false;
            item= req.body.orders[0].name

            break;
        }
        i++;
        
    }

    if(checkOrder===false) return res.status(400).send({success:false,reason:`Not have desired qty of ${item}`})

    req.body.orders.map(async(item) => {
       const product = await  Product.findByIdAndUpdate(item._id,{$inc:{stock:-item.qty}});

    });


    try {
          let order = await new Order({
            orders:req.body.orders,
            orderQty:req.body.orderQty,
            orderAmt:req.body.orderAmt
          })
          await order.save()
       res.status(201).send({success:true,value:order})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
})

router.get("/weekOrder",async(req,res)=>{
    try {
       const orders = await Order.find().select("-__v")
       const weekOrders = orders.filter((order)=>(new Date(order.createdAt).getTime() >= (new Date().getTime())/7 ));
       const orderData = {} 
       const orderRevenue = {}

       weekOrders.map(order => {
         for (let i = 0; i < 7; i++) {
            const dayTime =   new Date(new Date().toDateString()).getTime() - i*3600*1000*24
            const date = new Date(dayTime).getDate();
            const monthInNumber = new Date(dayTime).getMonth();
            const monthList = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]
            const month = monthList[monthInNumber+1];
            // console.log(monthInNumber);
            const dateString = `${date} ${month}`
            // console.log("date", dateString);
                 
            if(orderData[dateString]!==undefined && orderRevenue[dateString]!==undefined && (new Date(new Date(order.createdAt).toDateString()).getTime() === new Date(new Date().toDateString()).getTime()- i*3600*1000*24)){
                // console.log(dateString,order);
                orderData[dateString] += order.orderQty
                orderRevenue[dateString] += order.orderAmt
            }else if(orderData[dateString]===undefined && orderRevenue[dateString]===undefined ){
                if(new Date(new Date(order.createdAt).toDateString()).getTime() === new Date(new Date().toDateString()).getTime()- i*3600*1000*24){
                    orderData[dateString] = order.orderQty
                    orderRevenue[dateString] = order.orderAmt

                }else{ 
                    orderData[dateString] = 0
                    orderRevenue[dateString] = 0
            }  
            }
         }  
       });

       res.status(200).send({success:true,orderData,orderRevenue})
    } catch (err) {
        console.log(err);
        res.status(500).send({success:false, reason:err})
    }
})

module.exports = router