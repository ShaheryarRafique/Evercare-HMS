const dotenv = require('dotenv');
dotenv.config({path: '../config.env'});
const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: process.env.USER,
    password : process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 3306,
    insecureAuth: true
});

con.connect(error =>{
    if(error) throw error;
    console.log('Database is connected successfully !');
});

module.exports = con;