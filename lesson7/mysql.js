/**
 * Created by Administrator on 2016/12/19.
 */
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : '192.168.2.113',
    user     : 'root',
    password : 'nbs2010',
    port : 3306,
    database:'sys_account'
});

connection.connect();

connection.query('SELECT * from  NL_U_MENU', function(err, rows, fields) {
    if (err) throw err;

    console.log('The solution is: ', rows[0]);
});

connection.end();