const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', authController.protect, viewsController.getMainpage);
router.get('/login', viewsController.getLoginpage);
router.get('/register', viewsController.getRegisterpage);
router.get(
  '/myRaports',
  authController.protect,
  viewsController.getUserRaports,
);
router.get(
  '/myRaportsDetails',
  authController.protect,
  viewsController.getUserRaportsDetails,
);

module.exports = router;
