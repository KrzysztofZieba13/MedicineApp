const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const Meal = require('../models/mealModel');

exports.getMainpage = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Meal.find({ shared: true }), req.query)
    .filter()
    .sort();
  const meals = await features.query;

  if (!meals) return next(new AppError('Nie znaleziono dokumentu', 404));

  res.status(200).render('mainpage', { meals });
});
