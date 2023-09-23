const mongoose = require('mongoose');

const seasoningSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: [
            'Mint', 'Garlic Powder', 'Onion Powder', 'Oregano', 'Black Pepper', 
            'Salt', 'Curry', 'Chilli', 'Cayenne Peppers','Paprika','Cumin'
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

const Seasoning = mongoose.model('Seasoning', seasoningSchema);

module.exports = Seasoning;
