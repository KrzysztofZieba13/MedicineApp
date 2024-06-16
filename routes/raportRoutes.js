const express = require('express');
const authController = require('../controllers/authController');
const raportController = require('../controllers/raportController');

const router = express.Router();

router.post(
  '/createRaport',
  authController.protect,
  raportController.createRaport,
);

router.patch(
  '/updateUserRaport/:id',
  authController.protect,
  raportController.updateUserRaport,
);

router.post(
  '/:id/createRaportQuick',
  authController.protect,
  raportController.createRaportQuick,
);

router.get('/myRaports', authController.protect, raportController.myRaports);
module.exports = router;
