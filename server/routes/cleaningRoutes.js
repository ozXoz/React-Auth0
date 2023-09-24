const express = require('express');
const Cleaning = require('../models/Cleaning');
const router = express.Router();

// Create a new cleaning
// Create or Update a cleaning's quantity

// Create a new cleaning
router.post('/cleaning', async (req, res) => {
    try {
        const { name, imageUrl } = req.body; // Assuming you will be sending the name and imageUrl in the body

        // First check if the vegetable already exists
        let cleaning = await Cleaning.findOne({ name: name });
        if (cleaning) {
            return res.status(400).send({ message: "cleaning already exists" });
        }

        // If it doesn't exist, create a new container entry
        const newCleaning = new Cleaning({
            name: name,
            imageUrl: imageUrl,
            quantity: 0 // Default quantity set to 0, you can change this if required
        });

        await newCleaning.save();
        res.status(201).send(newCleaning);

    } catch (error) {
        console.error("Error while adding cleaning:", error);
        res.status(400).send({ error: "Failed to add cleaning" });
    }
});


router.post('/cleaningQuantity', async (req, res) => {
    console.log("Received body:", req.body);
    try {
        for (let [name, quantity] of Object.entries(req.body)) {
            let cleaning = await Cleaning.findOne({ name: name });
            if (cleaning) {
                // Update the quantity if the cleaning exists
                cleaning.quantity += quantity;
                await cleaning.save();
            } else {
                // Create a new cleaning entry if it doesn't exist
                const newCleaning = new Cleaning({
                    name: name,
                    quantity: quantity
                });
                await newCleaning.save();
            }
        }
        res.status(201).send({ message: "Quantities updated successfully" });
    } catch (error) {
        console.error("Actual error:", error); // <-- Added this line to log the actual error details
        res.status(400).send({ error: "Failed to update quantities" });
    }
});






// Get all drink
router.get('/cleaning', async (req, res) => {
    try {
        const cleaning = await Cleaning.find({});
        res.send(cleaning);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a single drink by ID
router.get('/cleaning/:id', async (req, res) => {
    try {
        const cleaning = await Cleaning.findById(req.params.id);
        if (!cleaning) {
            return res.status(404).send();
        }
        res.send(cleaning);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a cleaning
router.patch('/cleaning/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'imageUrl', 'dateAdded', 'quantity'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const cleaning = await Cleaning.findById(req.params.id);
        if (!cleaning) {
            return res.status(404).send();
        }

        updates.forEach(update => {
            if(update === 'quantity') {
                cleaning[update] += req.body[update]; // Increment the quantity
            } else {
                cleaning[update] = req.body[update];
            }
        });
        
        await cleaning.save();

        res.send(cleaning);
    } catch (error) {
        res.status(400).send(error);
    }
});



// container a seasoning
router.delete('/cleaning/:id', async (req, res) => {
    try {
        const cleaning = await Cleaning.findByIdAndDelete(req.params.id);
        if (!cleaning) {
            return res.status(404).send();
        }
        res.send(cleaning);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
