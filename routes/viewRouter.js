const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.getMainpage);
router.get('/login', viewsController.getLoginpage);
router.get('/register', viewsController.getRegisterpage);
router.get('/myRaports', viewsController.getUserRaports);

module.exports = router;
