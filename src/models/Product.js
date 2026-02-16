const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    //_id: String,
    _id: Number,
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    isAvailable: { type: Boolean, default: true }
}, {
    timestamps: true,
    _id: false
});

module.exports = mongoose.model("Product", productSchema);