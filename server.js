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

app.get('/checkname', function(req, res){
 //res.json({"success": true});
    db.query("select * from test", function(err , result){
        if(err) {
            console.log("error: ", err);
            res.json({"nooooo": true});
          }
          else{
            console.log("resssssssss: ", res);
            res.json(result)
          }
    })
});

app.get('/reqs', function(req, res){
  //res.json({"success": true});
     db.query("select * from Requests", function(err , result){
         if(err) {
             console.log("error: ", err);
             res.json({"nooooo": true});
           }
           else{
             console.log("requestsssss: ", res);
             res.json(result)
           }
     })
 });

 app.get('/responses', function(req, res){
  //res.json({"success": true});
     db.query("select * from Responses", function(err , result){
         if(err) {
             console.log("error: ", err);
             res.json({"nooooo": true});
           }
           else{
             console.log("Responsesssss: ", res);
             res.json(result)
           }
     })
 });

 app.post('/postreq',function(req,res){
   var reqinfo = {
     phone : req.body.phone,
     age : req.body.age,
     city : req.body.city
   }

   db.query("insert into Requests set ?" , reqinfo,function(err , result){
     if(err){
      console.log("error: ", err);
      res.json({"nooooo": true});
     }else{
      res.send('Saved succesfully');
      res.send(reqinfo)
     }
   })
 })

app.get('/posts', function(req, res) {

    res.json({"success": true});

});

app.listen(process.env.PORT || 8080);

