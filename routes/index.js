const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index.controller')


//abrir el index
router.get('/', indexController.openHome);

module.exports = router;
