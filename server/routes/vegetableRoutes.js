const express = require('express');
const Vegetable = require('../models/VegetableAdd');
const router = express.Router();

// Create a new vegetable
router.post('/addvegetables', async (req, res) => {
    const vegetable = new Vegetable(req.body);
    try {
        await vegetable.save();
        res.status(201).send(vegetable);
    } catch (error) {
        res.status(400).send(error);
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
    const allowedUpdates = ['name', 'imageUrl', 'dateAdded'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const vegetable = await Vegetable.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!vegetable) {
            return res.status(404).send();
        }
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
