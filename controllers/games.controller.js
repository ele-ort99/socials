const connection = require('../config/db')

class GameController {


openAddGame = (req, res) => {
  const {userId} = req.params;
  res.render('addGame', { message: "", userId: userId });
}


addGame = (req, res) => {

const {userId} = req.params;
const {name, review, stars, platform, year_publication} = req.body
if(!userId||!name||!review||!stars||!platform||!year_publication){
res.render("addGame", {message:"Debes cumplimentar todo el formulario", userId: userId})
}else if(!req.file){
res.render('addGame', {message:"Es obligatorio poner imagen", userId: userId})
}
else{
let sql = 'INSERT INTO game (id_user, name, review, stars, platform, year_publication, image) VALUES (?,?,?,?,?,?,?)'
let values = [userId, name, review, stars, platform, year_publication, req.file.filename]
connection.query(sql, values, (err, result)=>{
if(err){
    throw err;
}else{
    res.redirect(`/users/user/${userId}`)
}
})
}
}

//muestra el formulario
    openAddNewGameSelect = (req, res) =>{
        let sql = 'SELECT id_user, name, last_name FROM user WHERE user_deleted = 0'
        connection.query(sql, (err, result)=>{
            if(err){
                throw err;
            }else{
                res.render("addNewGameSelect", {thisUser: result, message:""})
            }
        })
    }

    addNewGameSelect = (req, res) =>{
        const {id_user, name, review, stars, platform, year_publication} = req.body;
      
        if(!id_user||!name||!review||!stars||!platform||!year_publication||!req.body) {
            let sql = 'SELECT id_user, name, last_name FROM user WHERE user_deleted = 0'
            connection.query(sql, (err, result)=>{
                if(err){
                    throw err;
                }else{
                    res.render("addNewGameSelect", {thisUser:result, message: "Debes cumplimentar todo el formulario"})
                }
            })
        }else{
           let sql = 'INSERT INTO game (id_user, name, review, stars, platform, year_publication, image) VALUES (?,?,?,?,?,?,?)'
           let values = [id_user, name, review, stars, platform, year_publication, req.file.filename]
           connection.query(sql, values, (err, result)=>{
            if(err){
                throw err;
            }else{
                res.redirect(`/users/user/${id_user}`)
            }
           })
        }
    }


    //abre el formulario de edición de un juego
    openEditGame = (req, res) => {
      const {id_game} =req.params;
      let sql = 'SELECT * FROM game WHERE id_game = ?'
      let values = [id_game]
      connection.query(sql, values, (err, result)=>{
        if(err){
          throw err
        }else{
        res.render("editGame", {gameEdited: result[0], message: ""})
        }
      })
  
    }
       

    editGame = (req, res) =>{ 
        const {id_game, id_user} = req.params;
        const { name, review, stars, platform } = req.body;
       
        if(!name||!review||!stars||!platform){
          let datosTemp = {
            id_game: id_game,
            id_user: id_user,
            name: name,
            review: review,
            stars: stars,
            platform: platform
          }
            res.render("editGame", {gameEdited: datosTemp, message: "¡ Debes cumplimentar todo el formulario !"})
        }else{

            let sql = 'UPDATE game SET name=?, review=?, stars=?, platform=? WHERE id_game=?'
            let values = [ name, review, stars, platform, id_game ]
            
            connection.query(sql, values, (err, result)=>{
                if(err){
                    throw err;
                }else{
                    res.redirect(`/users/user/${id_user}`)
                }
            })
        }
    } 


    deletedTotalGame = (req, res) => {
      const {id_game, id_user} = req.params
      let sql = 'DELETE FROM game WHERE id_game = ?'
      let values = [id_game]
      connection.query(sql, values, (err, result)=>{
        if(err){
          throw err
        }else{
          res.redirect(`/users/user/${id_user}`)
        }
      })
    }

    deletedGame = (req, res) => {
      const {id_game, id_user} = req.params
      let sql = 'UPDATE game SET game_deleted = 1 WHERE id_game = ?'
      let values = [id_game]
      connection.query(sql, values, (err, result)=>{
        if(err){
          throw err
        }else{
          res.redirect(`/users/user/${id_user}`)
        }
      })
    }

}


    module.exports = new GameController;