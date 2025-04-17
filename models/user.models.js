const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    skill: {
        type: String,
        required: true
    },
    portfolio: {
        type: String,
        required: true
    },
  }, { timestamps: true });
  
const User = mongoose.model('User', UserSchema);

module.exports = User