const mongoose = require('mongoose');

const raportSchema = new mongoose.Schema({
  meal: {
    type: mongoose.Schema.ObjectId,
    ref: 'Meal',
  },
  symptoms: [
    {
      type: String,
      enum: [
        'nudności',
        'ból brzucha',
        'zaparcia',
        'wzdęcia',
        'biegunka',
        'senność',
        'brak',
      ],
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
  pooped: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Raport = mongoose.model('Raport', raportSchema);
module.exports = Raport;
