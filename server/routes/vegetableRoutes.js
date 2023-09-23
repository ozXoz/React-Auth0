const express = require('express');
const Vegetable = require('../models/VegetableAdd');
const router = express.Router();

// Create a new vegetable
// Create or Update a vegetable's quantity

// Create a new vegetable
router.post('/vegetables', async (req, res) => {
    try {
        const { name, imageUrl } = req.body; // Assuming you will be sending the name and imageUrl in the body

        // First check if the vegetable already exists
        let vegetable = await Vegetable.findOne({ name: name });
        if (vegetable) {
            return res.status(400).send({ message: "Vegetable already exists" });
        }

        // If it doesn't exist, create a new vegetable entry
        const newVegetable = new Vegetable({
            name: name,
            imageUrl: imageUrl,
            quantity: 0 // Default quantity set to 0, you can change this if required
        });

        await newVegetable.save();
        res.status(201).send(newVegetable);

    } catch (error) {
        console.error("Error while adding vegetable:", error);
        res.status(400).send({ error: "Failed to add vegetable" });
    }
});


router.post('/vegetablesQuantity', async (req, res) => {
    try {
        for (let [name, quantity] of Object.entries(req.body)) {
            let vegetable = await Vegetable.findOne({ name: name });
            if (vegetable) {
                // Update the quantity if the vegetable exists
                vegetable.quantity += quantity;
                await vegetable.save();
            } else {
                // Create a new vegetable entry if it doesn't exist
                const newVegetable = new Vegetable({
                    name: name,
                    quantity: quantity
                });
                await newVegetable.save();
            }
        }
        res.status(201).send({ message: "Quantities updated successfully" });
    } catch (error) {
        console.error("Actual error:", error); // <-- Added this line to log the actual error details
        res.status(400).send({ error: "Failed to update quantities" });
    }
});






// Get all vegetables
router.get('/vegetables', async (req, res) => {
    try {
        const vegetables = await Vegetable.find({});
        res.send(vegetables);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a single vegetable by ID
router.get('/vegetables/:id', async (req, res) => {
    try {
        const vegetable = await Vegetable.findById(req.params.id);
        if (!vegetable) {
            return res.status(404).send();
        }
        res.send(vegetable);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a vegetable
router.patch('/vegetables/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'imageUrl', 'dateAdded', 'quantity'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const vegetable = await Vegetable.findById(req.params.id);
        if (!vegetable) {
            return res.status(404).send();
        }

        updates.forEach(update => {
            if(update === 'quantity') {
                vegetable[update] += req.body[update]; // Increment the quantity
            } else {
                vegetable[update] = req.body[update];
            }
        });
        
        await vegetable.save();

        res.send(vegetable);
    } catch (error) {
        res.status(400).send(error);
    }
});



// Delete a vegetable
router.delete('/vegetables/:id', async (req, res) => {
    try {
        const vegetable = await Vegetable.findByIdAndDelete(req.params.id);
        if (!vegetable) {
            return res.status(404).send();
        }
        res.send(vegetable);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
