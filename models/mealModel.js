const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Tytuł posiłku jest wymagany!'],
    trim: true,
    maxLength: [70, 'Maksymalna długość tytułu to 70 znaków'],
  },
  ingredients: [
    {
      type: String,
      default: 'Brak danych',
    },
  ],
  shared: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Meal = mongoose.model('Meal', mealSchema);
module.exports = Meal;
