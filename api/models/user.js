const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FoodSchema = require('./food');

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    nickname: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    foodAds: [FoodSchema.schema]
});

const User = mongoose.model('user', userSchema);
module.exports = User;
