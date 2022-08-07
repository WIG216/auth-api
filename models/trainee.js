const mongoose = require('mongoose');

const TraineeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});

const Trainee = mongoose.model('Trainee', TraineeSchema);

module.exports = Trainee;
