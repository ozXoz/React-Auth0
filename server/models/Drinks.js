const mongoose = require('mongoose');

const drinkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: [
            'Coca-Cola Light', 'Coca-Cola', 'Coca-Cola Zero', 'Pepsi', 'Pepsi Diet', 
            'Pepsi Zero', 'Bottle Coca-Cola Deit', 'Bottle Coca-Cola Diet', ' BottleCoca-Cola Zero','Bottle Pepsi','Bottle Pepsi Deit',
            'Cream Soda','Grape','Orange','Ice Tea','Canada Dry','Dr Pepper','Mug','Water','Milk Chocolate','Sprite','AriZona','Apple Juice',
            'Orange Juice','Raspberry','CranBerry','PineApple'
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

const Drink = mongoose.model('Drink', drinkSchema);

module.exports = Drink;
