var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override')
var cors = require('cors');
var db = require('./db.config')


var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());


app.get('/reqs', function(req, res){
  //res.json({"success": true});
     db.query("select * from Requests", function(err , result){
         if(err) {
             console.log("error: ", err);
             res.json({"error": true});
           }
           else{
             console.log("requests : ", res);
             res.json(result)
           }
     })
 });

 app.get('/responses', function(req, res){
  //res.json({"success": true});
     db.query("select * from Responses", function(err , result){
         if(err) {
             console.log("error: ", err);
             res.json({"error": true});
           }
           else{
             console.log("responses : ", res);
             res.json(result)
           }
     })
 });

 app.get('/matches', function(req, res){
  //res.json({"success": true});
     db.query("select * from Responses where City like ?",[req.body.city], function(err , result){
         if(err) {
             console.log("error: ", err);
             res.json({"error": true});
           }
           else{
             console.log("responses : ", res);
             res.json(result)
           }
     })
 });

 app.post('/postreq',function(req,res){
   var reqinfo = {
     Number : req.body.phone,
     Age : req.body.age,
     City : req.body.city
   }

   db.query("insert into Requests (Number , City , Age , Area , Status) values(?,?,?,?,?)" , [req.body.phone ,req.body.city, req.body.age , req.body.area, req.body.status ],function(err , result){
     if(err){
      console.log("there is an error")
      console.log("error: ", err);
      res.json({"error": true});
     }else{
      console.log("results : ",result)
      res.send('Saved succesfully');
     // res.send(reqinfo)
     }
   })
 })


 app.post('/postres',function(req,res){
  

  db.query("insert into Responses (Number , City , Count , Area ) values(?,?,?,?)" , [req.body.phone ,req.body.city, req.body.count , req.body.area ],function(err , result){
    if(err){
     console.log("there is an error")
     console.log("error: ", err);
     res.json({"error": true});
    }else{
     console.log("results : ",result)
     res.send('Saved succesfully');
    // res.send(reqinfo)
    }
  })
})

app.listen(process.env.PORT || 8080);

