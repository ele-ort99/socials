const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
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