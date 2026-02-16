const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    _id: Number,
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    address: {type: String, required: true},
    email: { type: String, unique: true, required: true },
    password: {type: String, required: true, select: false},
    role: { type: String, enum: ['ADMIN', 'USER'], default: 'USER' },
    isActive: { type: Boolean, default: true }
}, { timestamps: true, _id: false });

// encrypt password before saving
userSchema.pre("save", async function() {
    if(!this.isModified("password")) 
        return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // next();
});

// to decrypt password for comparison
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model("User", userSchema);