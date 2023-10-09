const mongoose = require('mongoose');
const tripSchema = new mongoose.Schema({
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
});

const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;