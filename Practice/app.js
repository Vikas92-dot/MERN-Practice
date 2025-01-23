const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/itemRoute');

const app = express();
const PORT = 3000;

//middleware
app.use(bodyParser.json());

//MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/testdb',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
//After connecting to MongoDB using mongoose.connect(), Mongoose automatically creates a connection object
const db = mongoose.connection; //This line assign that connection object to db.
//This object allows you to listen for specific connection events, such as error, open, etc.

//on is event listener that listen persistent events in this case it is listen error event
//Keeps monitoring the connection for errors continuously.
db.on('error',console.error.bind(console, 'connection error:'));

//once is event listener that listen only once
db.once('open',() =>{
    console.log('Connected to MongoDb');
})

//Routes
app.use('/items', itemRoutes);

//Start the server
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})

