const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,      
  user: process.env.MYSQL_USER,     
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE, 
  port: process.env.MYSQL_PORT   
});

//conexion de prueba
connection.connect((err)=>{
    if(err){
        console.log('Error de conexión', err.stack);
    }else{
        console.log('Conexión correcta con la db');   
    }
})

module.exports = connection;