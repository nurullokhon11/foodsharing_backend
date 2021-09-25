var mongoose = require('mongoose');
const FoodType = require('../models/food_type');

function createFoodType(req, res) {
    var foodType = new FoodType(req.body);
    foodType.save(function(err) {
        if (err) {
            return res.status(400).json({
                status: 'error',
                error: 'Bad request!',
            });
        }
        return res.status(200).json({ message: 'Food type added' });
    });
};

function getFoodTypes(req, res) {
    query = (req.query.id) ? { id: parseInt(req.query.id) } : {};
    FoodType.find(query, function(err, foodTypes) {
        if (err) {
            return res.status(400).json({
                status: 'error',
                error: 'Bad request!',
            });
        } else {
            return res.status(200).json(foodTypes);
        }
    });
}

module.exports = {
    createFoodType,
    getFoodTypes
};
