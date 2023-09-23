const mongoose = require('mongoose');

const vegetableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: [
            'Cucumber', 'Parsley', 'Red Cabbage', 'White Cabbage', 'Tomato',
            'Lettuce', 'Onions', 'Turnip', 'Pickles', 'Banana Hot Peppers','Garlic'
        ]
    },
    imageUrl: {
        type: String,
        required: false
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    }
});

const Vegetable = mongoose.model('Vegetable', vegetableSchema);

module.exports = Vegetable;
