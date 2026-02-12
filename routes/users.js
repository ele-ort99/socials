const express = require('express');
const uploadImg = require('../middlewares/uploadImg');
const usersController = require('../controllers/users.controller');
const router = express.Router();

// Registro de usuarios
router.get('/register', usersController.openFormRegister);
router.post('/register', uploadImg("usuarios"), usersController.register);

// Visualización de un usuario
router.get('/user/:id', usersController.openUser);

//Editar un usuario
router.get('/editUser/:id_user', usersController.openEditUser)
router.post('/editUser/:id_user', usersController.editUser)

//BORRADO
//Borrar usuario
router.get('/deletedTotalUser/:id_user', usersController.deletedTotalUser)

//eliminar usuario de vistas
router.get('/deletedUser/:id_user', usersController.deletedUser)


module.exports = router;
