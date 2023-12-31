const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    qty: {
        type: String,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Product', ProductSchema);