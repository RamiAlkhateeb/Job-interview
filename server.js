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
              res.json(res)
          }
    })
});

app.get('/posts', function(req, res) {

    res.json({"success": true});

});

app.listen(process.env.PORT || 8080);

