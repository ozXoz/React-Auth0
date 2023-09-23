const express = require('express');
const Seasoning = require('../models/Seasoning');
const router = express.Router();

// Create a new vegetable
// Create or Update a vegetable's quantity

// Create a new seasoning
router.post('/seasoning', async (req, res) => {
    try {
        const { name, imageUrl } = req.body; // Assuming you will be sending the name and imageUrl in the body

        // First check if the vegetable already exists
        let seasoning = await Seasoning.findOne({ name: name });
        if (seasoning) {
            return res.status(400).send({ message: "Seasoning already exists" });
        }

        // If it doesn't exist, create a new seasoning entry
        const newSeasoning = new Seasoning({
            name: name,
            imageUrl: imageUrl,
            quantity: 0 // Default quantity set to 0, you can change this if required
        });

        await newSeasoning.save();
        res.status(201).send(newSeasoning);

    } catch (error) {
        console.error("Error while adding seasoning:", error);
        res.status(400).send({ error: "Failed to add vegetable" });
    }
});


router.post('/seasoningQuantity', async (req, res) => {
    console.log("Received body:", req.body);
    try {
        for (let [name, quantity] of Object.entries(req.body)) {
            let seasoning = await Seasoning.findOne({ name: name });
            if (seasoning) {
                // Update the quantity if the seasoning exists
                seasoning.quantity += quantity;
                await seasoning.save();
            } else {
                // Create a new seasoning entry if it doesn't exist
                const newSeasoning = new Seasoning({
                    name: name,
                    quantity: quantity
                });
                await newSeasoning.save();
            }
        }
        res.status(201).send({ message: "Quantities updated successfully" });
    } catch (error) {
        console.error("Actual error:", error); // <-- Added this line to log the actual error details
        res.status(400).send({ error: "Failed to update quantities" });
    }
});






// Get all vegetables
router.get('/seasoning', async (req, res) => {
    try {
        const seasoning = await Seasoning.find({});
        res.send(seasoning);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a single seasoning by ID
router.get('/seasoning/:id', async (req, res) => {
    try {
        const seasoning = await Seasoning.findById(req.params.id);
        if (!seasoning) {
            return res.status(404).send();
        }
        res.send(seasoning);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a seasoning
router.patch('/seasoning/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'imageUrl', 'dateAdded', 'quantity'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const seasoning = await Seasoning.findById(req.params.id);
        if (!seasoning) {
            return res.status(404).send();
        }

        updates.forEach(update => {
            if(update === 'quantity') {
                seasoning[update] += req.body[update]; // Increment the quantity
            } else {
                seasoning[update] = req.body[update];
            }
        });
        
        await seasoning.save();

        res.send(seasoning);
    } catch (error) {
        res.status(400).send(error);
    }
});



// Delete a seasoning
router.delete('/seasoning/:id', async (req, res) => {
    try {
        const seasoning = await Seasoning.findByIdAndDelete(req.params.id);
        if (!seasoning) {
            return res.status(404).send();
        }
        res.send(seasoning);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
