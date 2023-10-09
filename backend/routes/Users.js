const express = require("express");
const router = express.Router();
const { format } = require('date-fns');
const plivo = require('plivo');

// Load User and Trip models
const User = require("../models/Users");
const Trip = require("../models/trips");

// Plivo configuration
const plivoAuthId = 'AuthId';
const plivoAuthToken = 'AuthToken';
const plivoSrcPhoneNumber = '+917013469187'; // Your Plivo source phone number

const plivoClient = new plivo.Client(plivoAuthId, plivoAuthToken);

// Helper function to send SMS
function sendSMS(phoneNumber, message) {
  plivoClient.messages.create({
    src: plivoSrcPhoneNumber,
    dst: phoneNumber,
    text: message,
  })
  .then((response) => {
    console.log('SMS sent to', phoneNumber, 'Response:', response);
  })
  .catch((error) => {
    console.error('Error sending SMS to', phoneNumber, 'Error:', error);
  });
}

// GET request
// Getting all the users
router.get("/", function(req, res) {
  User.find(function(err, users) {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(users);
    }
  });
});

// POST request
// Add a user to db
router.post("/add", (req, res) => {
  const { username, email, phoneNumber, password,trips } = req.body;
  const newUser = new User({
    username,
    email,
    phoneNumber,
    password,
    trips
  });
  newUser.save()
    .then(user => res.json(user))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// POST request
// Login
router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'Email not found' });
    }

    res.send('Email Found');

    if (password === user.password) {
      res.send('Password Matched');
      return user;
    } else {
      res.send('Password Not Matched');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST request
// Logout
router.post("/logout", (req, res) => {
  res.send("Logged Out");
});

module.exports = router;
