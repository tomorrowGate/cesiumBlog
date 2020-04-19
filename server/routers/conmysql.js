const mysql      = require('mysql');
let connection = mysql.createConnection({
  host     : '120.24.215.190',
  user     : 'root',
  password : '5711297Aa',
  database : 'levymap'
});
 
connection.connect();

let query = "SELECT ST_Intersection(?, ?) from t_geo_test2, t_geo_test" 
let quertAs = ['t_geo_test2.SHAPE','t_geo_test.SHAPE',]
connection.query(query,quertAs,function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});
connection.end();