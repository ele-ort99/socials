const connection = require('../config/db')

class IndexController{
  openHome = (req, res)=>{
    let sql = 'SELECT * FROM user WHERE user_deleted = 0'

    connection.query(sql, (err, result)=>{
      if(err){
        throw err
      } else{
      res.render('index', {thisUser: result})}
    })
   
  }

}


module.exports = new IndexController;