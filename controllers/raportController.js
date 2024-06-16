const Meal = require('../models/mealModel');
const Raport = require('../models/raportModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

exports.createRaport = catchAsync(async (req, res, next) => {
  let date;
  let symptoms;
  if (req.body.date) date = new Date(req.body.date);
  if (!req.body.symptoms) symptoms = 'brak';
  else symptoms = req.body.symptoms.toLowerCase().split(', ');

  const meal = await Meal.create({
    title: req.body.title,
    ingredients: req.body.ingredients.split(', '),
    shared: false,
  });

  const raport = await Raport.create({
    meal: meal._id,
    symptoms,
    date,
    pooped: req.body.pooped,
    user: req.user.id,
  });

  res.status(201).json({
    status: 'success',
    data: {
      meal,
      raport,
    },
  });
});

exports.createRaportQuick = catchAsync(async (req, res, next) => {
  let date;
  let symptoms;
  if (req.body.date) date = new Date(req.body.date);
  if (!req.body.symptoms) symptoms = 'Brak';
  else symptoms = req.body.symptoms.toLowerCase().split(', ');

  const raport = await Raport.create({
    meal: req.params.id,
    symptoms,
    date,
    pooped: req.body.pooped,
    user: req.user.id,
  });

  res.status(201).json({
    status: 'success',
    data: {
      raport,
    },
  });
});

exports.myRaports = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Raport.find({ user: req.user.id }).populate('meal'),
    req.query,
  )
    .filter()
    .sort();

  const raports = await features.query;

  if (!raports) return next(new AppError('Raporty nie istnieją', 404));

  res.status(200).json({
    status: 'success',
    length: raports.length,
    data: raports,
  });
});

exports.updateUserRaport = catchAsync(async (req, res, next) => {
  const raport = await Raport.findOneAndUpdate(
    {
      user: req.user._id,
      _id: req.params.id,
    },
    {
      symptoms: req.body.symptoms,
      pooped: req.body.pooped,
      date: req.body.date,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!raport)
    return next(
      new AppError('Niepoprawnie wybrany raport, spróbuj ponownie.', 404),
    );
  res.status(200).json({
    status: 'success',
    data: raport,
  });
});
