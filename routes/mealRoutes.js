const express = require('express');
const mealController = require('../controllers/mealController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/getSharedMeals', mealController.getSharedMeals);
router.post('/createMeal', authController.protect, mealController.createMeal);

module.exports = router;
