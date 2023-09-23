const express = require('express');
const Vegetable = require('../models/VegetableAdd');
const router = express.Router();

// Create a new vegetable
// Create or Update a vegetable's quantity
router.post('/addvegetables', async (req, res) => {
    try {
        for (let [id, quantity] of Object.entries(req.body)) {
            let vegetable = await Vegetable.findById(id);
            if (vegetable) {
                vegetable.quantity += quantity;  // Update the quantity
                await vegetable.save();
            } else {
                // Handle the case where vegetable doesn't exist if needed
            }
        }
        res.status(201).send({ message: "Quantities updated successfully" });
    } catch (error) {
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
