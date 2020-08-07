const mysql = require('mysql');
//local mysql db connection
export const dbConn = mysql.createConnection({
  host     : 'remotemysql.com',
  port : 3306,
  user     : 'gqboZWghHT',
  password : 'txSrPqeUWE',
  database : 'gqboZWghHT'
});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
//module.exports = dbConn;