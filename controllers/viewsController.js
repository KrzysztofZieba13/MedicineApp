const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const Meal = require('../models/mealModel');
const Raport = require('../models/raportModel');

exports.getMainpage = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Meal.find({ shared: true }), req.query)
    .filter()
    .sort();
  const meals = await features.query;

  if (!meals) return next(new AppError('Nie znaleziono dokumentu', 404));

  res.status(200).render('mainpage', { meals });
});

exports.getLoginpage = catchAsync(async (req, res, next) => {
  res.status(200).render('login');
});

exports.getRegisterpage = catchAsync(async (req, res, next) => {
  res.status(200).render('register');
});

exports.getUserRaports = catchAsync(async (req, res, next) => {
  res.status(200).render('raports');
});

exports.getUserRaportsDetails = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Raport.find({ user: req.user.id }).populate('meal').sort({ date: -1 }),
    req.query,
  ).filter();

  const raports = await features.query;

  if (!raports) return next(new AppError('Raporty nie istnieją', 404));

  res.status(200).render('raportsDetails', { raports });
});
