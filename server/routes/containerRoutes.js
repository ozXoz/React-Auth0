const express = require('express');
const Drink = require('../models/Container');
const Container = require('../models/Container');
const router = express.Router();

// Create a new container
// Create or Update a container's quantity

// Create a new seasoning
router.post('/container', async (req, res) => {
    try {
        const { name, imageUrl } = req.body; // Assuming you will be sending the name and imageUrl in the body

        // First check if the vegetable already exists
        let container = await Container.findOne({ name: name });
        if (container) {
            return res.status(400).send({ message: "container already exists" });
        }

        // If it doesn't exist, create a new container entry
        const newContainer = new Container({
            name: name,
            imageUrl: imageUrl,
            quantity: 0 // Default quantity set to 0, you can change this if required
        });

        await newContainer.save();
        res.status(201).send(newContainer);

    } catch (error) {
        console.error("Error while adding container:", error);
        res.status(400).send({ error: "Failed to add container" });
    }
});


router.post('/containerQuantity', async (req, res) => {
    console.log("Received body:", req.body);
    try {
        for (let [name, quantity] of Object.entries(req.body)) {
            let container = await Container.findOne({ name: name });
            if (container) {
                // Update the quantity if the drink exists
                container.quantity += quantity;
                await container.save();
            } else {
                // Create a new drink entry if it doesn't exist
                const newContainer = new Container({
                    name: name,
                    quantity: quantity
                });
                await newContainer.save();
            }
        }
        res.status(201).send({ message: "Quantities updated successfully" });
    } catch (error) {
        console.error("Actual error:", error); // <-- Added this line to log the actual error details
        res.status(400).send({ error: "Failed to update quantities" });
    }
});






// Get all drink
router.get('/container', async (req, res) => {
    try {
        const container = await Container.find({});
        res.send(container);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a single drink by ID
router.get('/container/:id', async (req, res) => {
    try {
        const container = await Container.findById(req.params.id);
        if (!container) {
            return res.status(404).send();
        }
        res.send(container);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a container
router.patch('/container/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'imageUrl', 'dateAdded', 'quantity'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const container = await Container.findById(req.params.id);
        if (!container) {
            return res.status(404).send();
        }

        updates.forEach(update => {
            if(update === 'quantity') {
                container[update] += req.body[update]; // Increment the quantity
            } else {
                container[update] = req.body[update];
            }
        });
        
        await container.save();

        res.send(container);
    } catch (error) {
        res.status(400).send(error);
    }
});



// container a seasoning
router.delete('/container/:id', async (req, res) => {
    try {
        const container = await Container.findByIdAndDelete(req.params.id);
        if (!container) {
            return res.status(404).send();
        }
        res.send(container);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
