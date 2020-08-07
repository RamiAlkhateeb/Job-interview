import express from 'express';
import { json } from 'body-parser';
import logger from 'morgan';
import methodOverride from 'method-override';
import cors from 'cors';
import dbConn from './db.config'


var app = express();
app.use(logger('dev'));
app.use(json());
app.use(methodOverride());
app.use(cors());

var db = dbConn();

app.post('/checkname', function(req, res){

});

app.get('/posts', function(req, res) {

    // res.json({"success": true});
    db.query("select * from test", function(err , result){
        if(err) {
            console.log("error: ", err);
            res.json({"nooooo": true});
          }
          else{
              res.json(res)
          }
    })

});



app.listen(process.env.PORT || 8080);

