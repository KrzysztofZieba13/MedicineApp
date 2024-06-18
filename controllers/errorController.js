const AppError = require('../utils/appError');

const handleDuplicateFieldsDB = (err) => {
  const message = `Duplikat: ${err.keyValue?.name || err.keyValue?.email}. Użyj innego`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.value);

  const message = `Niepoprawne dane: ${errors.join(', ')}`;
  return new AppError(message, 400);
};

const handleCastErrorDB = (err) => {
  const message = `Niepoprawne dane w polu: ${err.path}:${err.value}`;
  return new AppError(message, 400);
};
//////////////////////////////////////////
/////////////SENDING ERRORS///////////////
//////////////////////////////////////////
const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith('/api'))
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });

  console.error('ERROR 🔥', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational)
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    console.error('ERROR 🔥', err);
    return res.status(500).json({
      status: 'error',
      message: 'Coś poszło bardzo nie tak!',
    });
  }

  console.log(err.isOperational);
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    });
  }
  // B) Programming or other unknown error: don't leak error details
  console.error('ERROR 🔥', err);
  // Send generic message
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later.',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') sendErrorDev(err, req, res);
  else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    error.name = err.name;

    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    sendErrorProd(error, req, res);
  }
};
