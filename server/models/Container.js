const mongoose = require('mongoose');

const containerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: [
            'Small Box','Medium','Large Box','Sauce Box','combo Box','Soup Box','Soup Box Led'
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

const Container = mongoose.model('Container', containerSchema);

module.exports = Container;
