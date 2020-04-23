//code of calculating grand Total and total
//--------------------------------------------------------------------------------
app.get('/cart',(req,res)=>{
  //console.log(req.session.user);
  var user=req.session.user
  if(req.session.user==null){
   userip=ip.address();
   Cart.aggregate(
     [{
          $lookup:
                   {
                       from:"products",
                       localField:"pid",
                       foreignField:"_id",
                       as:"pro"
                   }
     },{$match:{user:userip}}
   ],(err,result)=>{
       if (err) throw err;
       console.log(result);
       res.render('cart',{cart:result,userip:userip})
     }
   )
   }
  else
  {
      Cart.aggregate(
        [{
             $lookup:
                      {
                          from:"products",
                          localField:"pid",
                          foreignField:"_id",
                          as:"pro"
                      }
        },{$match:{user:user}}
      ],(err,result)=>{
          if (err) throw err;
          else
          //console.log(result);
          //---------------------------------
          var fprice=result.map((rec)=>{
          return rec.pro[0].price*rec.quantity;
          })
          console.log(">>>>>"+fprice);

          var finaldata=result.map((rec,index)=>{
            var pair={fprice:fprice[index]};
            var objs={...rec,...pair}
            return objs;
          })

          var grandTotal=fprice.reduce((total,num)=>{return total+num},0)
          console.log("Grand Total="+grandTotal);
          //--------------------------------
          res.render('cart',{cart:finaldata,uid:req.session.user,gTotal:grandTotal})
        }
      )
}

})
//##################    DELETE FROM CART   ###############################3
app.get('/delcart',(req,res)=>{
  pid=req.query.pid
   user=req.session.user;
  if(req.session.user==null){
     userip=ip.address();
     res.render('index',{products:result,userip:userip,msg:'Product included in cart......!!!'})}
  else{
    Cart.remove({pid:pid},(err,result)=>{
      if(err) throw err;
      else if(result.affectedRows!=0)
    {
      Cart.aggregate(
        [{
             $lookup:
                      {
                          from:"products",
                          localField:"pid",
                          foreignField:"_id",
                          as:"pro"
                      }
        },{$match:{user:user}}
      ],(err,result)=>{
          if (err) throw err;
          console.log(result);
          res.render('cart',{cart:result,uid:req.session.user})
        }
      )
    }
    })

  }

})
//-----------------------------------------------------------------------