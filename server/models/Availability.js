const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    petSitterId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    activeOn: {
        type: String,
        default: "1 Event Type",
    },
    timeZone: {
        type: String, 
        default: 'Pacific Time - US & Canada',
    },
    workingHours: [{
        day: {
            type: String,
            enum: ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'],
        },
        start: String,
        end: String,
    }];
});

module.exports = Availability = mongoose.model("Availability", availabilitySchema);