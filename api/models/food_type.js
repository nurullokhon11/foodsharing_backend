const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodTypeSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

const FoodType = mongoose.model('food_type', foodTypeSchema);
module.exports = FoodType;
