const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    _id: Number,
    productId: { type: mongoose.Schema.Types.Number, ref: "Product" },
    quantity: Number,
    price: Number,
    totalAmount: Number,
    status: { type: String, enum: ['CREATED', 'CANCELLED', 'COMPLETED'], default: 'CREATED' },
    customerId: { type: mongoose.Schema.Types.Number, ref: "User" },
    orderDate: Date
}, { timestamps: true, _id: false });

module.exports = mongoose.model("Order", orderSchema);