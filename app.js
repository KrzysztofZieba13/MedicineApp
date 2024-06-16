const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const mealRouter = require('./routes/mealRoutes');
const userRouter = require('./routes/userRoutes');
const raportRouter = require('./routes/raportRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

dotenv.config({ path: './config.env' });

//Init app
const app = express();

app.use(express.json());
app.use(cookieParser());
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose.connect(DB).then(() => {
  console.log('DB connection successfull!');
});

app.use('/api/v1/meals', mealRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/raports', raportRouter);
app.all('*', (req, res, next) =>
  next(
    new AppError(`Trasa nie istnieje na tym serwerze: ${req.originalUrl}`, 404),
  ),
);
app.use(globalErrorHandler);
//set port value and start server listening
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App running on port ${port}...`));
