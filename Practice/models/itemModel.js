const mongoose = require('mongoose');

const  itemSchema = new mongoose.Schema({
    id:{
        type: Number,
    },
    name:{
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price:{
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Item', itemSchema);
