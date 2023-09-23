const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const cors = require('cors'); // Add this line
app.use(express.json())
const vegetableRoutes = require('./routes/vegetableRoutes');
const seasoningRoutes = require('./routes/seasoningRoutes');

const vegetableSchema =require("./models/VegetableAdd");
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




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
