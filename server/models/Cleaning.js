const mongoose = require('mongoose');

const cleaningSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: [
            'bleach','detergent'
        ]
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    }, imageUrl: {
        type: String,
        required: false
    }
});

const Cleaning = mongoose.model('Cleaning', cleaningSchema);

module.exports = Cleaning;
