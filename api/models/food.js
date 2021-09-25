const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: false,
    },
    type: {
        type: Number,
        required: true,
    },
    typeName: {
        type: String,
        required: false,
    },
    weight: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    exp_date: {
        type: Date,
        required: true,
    },
    latitude: {
        type: Number,
        required: false
    },
    longitude: {
        type: Number,
        required: false,
    },
    reserved: {
        type: Boolean,
        required: false
    }
});

const Food = mongoose.model('food', foodSchema);
module.exports = Food;