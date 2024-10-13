// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    social_media_handle: { type: String, required: true },
    images: [{ type: String }] // Array to hold image file paths
});

const User = mongoose.model('User', userSchema);

module.exports = User;
