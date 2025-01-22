const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
const PORT = 3000;

//middleware
app.use(bodyParser.json());


