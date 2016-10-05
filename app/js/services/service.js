(function() {
  'use strict';

  const mysql = require('mysql');
  const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'inventory'
  });
  connection.connect();


  connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
  });
}());
