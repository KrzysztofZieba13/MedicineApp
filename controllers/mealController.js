const Meal = require('../models/mealModel');
const APIFeatures = require('../utils/apiFeatures');
// const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getSharedMeals = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Meal.find({ shared: true }), req.query)
    .filter()
    .sort();
  const meal = await features.query;

  if (!meal) return next(new AppError('Nie znaleziono dokumentu', 404));

  res.status(200).json({
    status: 'success',
    length: meal.length,
    data: meal,
  });
});

exports.createMeal = catchAsync(async (req, res, next) => {
  const ingredients = req.body.ingredients.split(', ');
  const meal = await Meal.create({
    title: req.body.title,
    ingredients,
    shared: true,
  });

  res.status(201).json({
    status: 'success',
    data: meal,
  });
});
