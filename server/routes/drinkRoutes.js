const express = require('express');
const Drink = require('../models/Drinks')
const router = express.Router();

// Create a new Drink
// Create or Update a vegetable's quantity

// Create a new seasoning
router.post('/drink', async (req, res) => {
    try {
        const { name, imageUrl } = req.body; // Assuming you will be sending the name and imageUrl in the body

        // First check if the vegetable already exists
        let drink = await Drink.findOne({ name: name });
        if (drink) {
            return res.status(400).send({ message: "Drink already exists" });
        }

        // If it doesn't exist, create a new seasoning entry
        const newDrink = new Seasoning({
            name: name,
            imageUrl: imageUrl,
            quantity: 0 // Default quantity set to 0, you can change this if required
        });

        await newDrink.save();
        res.status(201).send(newDrink);

    } catch (error) {
        console.error("Error while adding seasoning:", error);
        res.status(400).send({ error: "Failed to add Drink" });
    }
});


router.post('/drinkQuantity', async (req, res) => {
    console.log("Received body:", req.body);
    try {
        for (let [name, quantity] of Object.entries(req.body)) {
            let drink = await Drink.findOne({ name: name });
            if (drink) {
                // Update the quantity if the drink exists
                drink.quantity += quantity;
                await drink.save();
            } else {
                // Create a new drink entry if it doesn't exist
                const newDrink = new Drink({
                    name: name,
                    quantity: quantity
                });
                await newDrink.save();
            }
        }
        res.status(201).send({ message: "Quantities updated successfully" });
    } catch (error) {
        console.error("Actual error:", error); // <-- Added this line to log the actual error details
        res.status(400).send({ error: "Failed to update quantities" });
    }
});






// Get all drink
router.get('/drink', async (req, res) => {
    try {
        const drink = await Drink.find({});
        res.send(drink);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a single drink by ID
router.get('/drink/:id', async (req, res) => {
    try {
        const drink = await Drink.findById(req.params.id);
        if (!drink) {
            return res.status(404).send();
        }
        res.send(drink);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a drink
router.patch('/drink/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'imageUrl', 'dateAdded', 'quantity'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const drink = await Drink.findById(req.params.id);
        if (!drink) {
            return res.status(404).send();
        }

        updates.forEach(update => {
            if(update === 'quantity') {
                drink[update] += req.body[update]; // Increment the quantity
            } else {
                drink[update] = req.body[update];
            }
        });
        
        await drink.save();

        res.send(drink);
    } catch (error) {
        res.status(400).send(error);
    }
});



// Delete a seasoning
router.delete('/drink/:id', async (req, res) => {
    try {
        const drink = await Drink.findByIdAndDelete(req.params.id);
        if (!drink) {
            return res.status(404).send();
        }
        res.send(drink);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
