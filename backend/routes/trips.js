// Backend_Folder/routes/trips.js
const express = require('express');
const router = express.Router();
const { format, parse } = require('date-fns');
const plivo = require('plivo');
const User = require('../models/Users');

// Plivo configuration
const plivoAuthId = 'AuthId';
const plivoAuthToken = 'AuthToken';
const plivoSrcPhoneNumber = '+917013459187'; // Your Plivo source phone number

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

// Helper function to schedule a message
function scheduleMessage(phoneNumber, message, date) {
  const now = new Date();
  const delay = date - now;

  // Check if the scheduled time is in the future
  if (delay > 0) {
    setTimeout(() => {
      sendSMS(phoneNumber, message);
    }, delay);
  } else {
    console.error('Cannot schedule a message for the past');
  }
}

// Add a schedule to a trip
router.post('/:tripId/add', async (req, res) => {
  const { event, date, phoneNumber } = req.body;
  const tripId = req.params.tripId;

  try {
    const user = await User.findById(tripId);

    if (!user) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const newSchedule = {
      event,
      date,
    };

    user.trips[0].schedule.push(newSchedule); // Assuming only one trip for simplicity

    // Save the updated user document
    await user.save();

    // Schedule SMS notification
    scheduleMessage(phoneNumber, `scheduled to : ${event} on ${format(new Date(date), 'MM/dd/yyyy HH:mm')}`, new Date(date));

    res.status(200).json({ message: 'Schedule added successfully' });
  } catch (error) {
    console.error('Error adding schedule:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a schedule in a trip
router.put('/:tripId/update/:scheduleId', async (req, res) => {
  const { event, date, phoneNumber } = req.body;
  const tripId = req.params.tripId;
  const scheduleId = req.params.scheduleId;

  try {
    const user = await User.findById(tripId);

    if (!user) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const scheduleToUpdate = user.trips[0].schedule.id(scheduleId);

    if (!scheduleToUpdate) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    scheduleToUpdate.event = event;
    scheduleToUpdate.date = date;

    // Save the updated user document
    await user.save();

    // Schedule SMS notification
    scheduleMessage(phoneNumber, `Event updated: ${event} on ${format(new Date(date), 'MM/dd/yyyy HH:mm')}`, new Date(date));

    res.status(200).json({ message: 'Schedule updated successfully' });
  } catch (error) {
    console.error('Error updating schedule:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a schedule from a trip
router.delete('/:tripId/delete/:scheduleId', async (req, res) => {
  const tripId = req.params.tripId;
  const scheduleId = req.params.scheduleId;

  try {
    const user = await User.findById(tripId);

    if (!user) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const scheduleToDelete = user.trips[0].schedule.id(scheduleId);

    if (!scheduleToDelete) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    scheduleToDelete.remove();

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    console.error('Error deleting schedule:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
