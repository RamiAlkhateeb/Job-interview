const mysql = require('mysql');
//local mysql db connection
 const dbConn = mysql.createConnection({
  host     : 'remotemysql.com',
  port : 3306,
  user : 'CDbfPZXSdu',
  password : 'tUXEN24sv3',
  database : 'CDbfPZXSdu'
});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;