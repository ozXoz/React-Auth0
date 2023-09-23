const mongoose = require('mongoose');

const vegetableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: [
            'Cucumber', 'Parsley', 'Red Cabbage', 'White Cabbage', 'Tomato',
            'Lettuce', 'Onions', 'Turnip', 'Pickles', 'Banana Hot Peppers'
        ]
    },
    imageUrl: {
        type: String,
        required: false // You can make it required if you always want an image associated
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

const Vegetable = mongoose.model('Vegetable', vegetableSchema);

module.exports = Vegetable;
