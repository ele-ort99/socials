const gameController = require('../controllers/games.controller')
const express = require('express')
const uploadImg = require('../middlewares/uploadImg')
const router = express.Router();

// Añadir juego
router.get('/openAddGame/:userId', gameController.openAddGame);
router.post('/addGame/:userId', uploadImg("juegos"), gameController.addGame);

//Añadir juego con selector
router.get('/addNewGameSelect', gameController.openAddNewGameSelect)
router.post('/addNewGameSelect', uploadImg("juegos"), gameController.addNewGameSelect)

//editar juego
router.get('/editGame/:id_game', gameController.openEditGame)
router.post('/editGame/:id_game/:id_user', gameController.editGame)

//BORRADO
//eliminar juego de base de datos
router.get('/deletedTotalGame/:id_game/:id_user', gameController.deletedTotalGame)

//eliminar juego de vistas
router.get('/deletedGame/:id_game/:id_user', gameController.deletedGame)




module.exports = router;