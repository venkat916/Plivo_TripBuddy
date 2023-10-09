const mongoose = require('mongoose');

// Define the User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  trips: [
    {
      tripName: {
        type: String,
        required: true,
        trim: true,
      },
      schedule: [
        {
          event: {
            type: String,
            required: true,
            trim: true,
          },
          date: {
            type: Date,
            required: true,
          },
        },
      ],
    },
  ],
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
