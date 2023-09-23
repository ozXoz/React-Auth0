const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const cors = require('cors'); // Add this line
app.use(express.json())

const vegetableSchema =require("./models/VegetableAdd");
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // Enable credentials (cookies, authorization headers, etc)
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




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
