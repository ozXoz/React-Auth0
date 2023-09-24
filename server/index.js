const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const cors = require('cors'); // Add this line
const bodyParser = require('body-parser');
app.use(bodyParser.json());



const vegetableRoutes = require('./routes/vegetableRoutes');
const seasoningRoutes = require('./routes/seasoningRoutes');
const drinkRoutes = require('./routes/drinkRoutes');
const containerRoutes = require('./routes/containerRoutes');
const cleaningRoutes = require('./routes/cleaningRoutes');

require("./models/VegetableAdd");
require("./models/Seasoning");
require("./models/Drinks");
require("./models/Container");
require("./models/Cleaning");


app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));


  mongoose.connect("mongodb+srv://test99:Azr2010q+@cluster0.lgsng1z.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/api', vegetableRoutes);
app.use('/api', seasoningRoutes);
app.use('/api', drinkRoutes);
app.use('/api', containerRoutes);
app.use('/api', cleaningRoutes);





app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
