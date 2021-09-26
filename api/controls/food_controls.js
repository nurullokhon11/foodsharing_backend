var mongoose = require('mongoose');
const Food = require('../models/food');


module.exports = {
    createFoodAd,
    getFoodAds
};

function createFoodAd(req, res) {
    // newAd = new Food(req.body);
    // newAd
    //     .save()
    //     .then((data) => {
    //         res.json(data);
    //     })
    //     .catch((err) => console.error(err));
    var food = new Food(req.body);
    food.save(function(err) {
        if (err) {
            return res.status(400).json({
                status: 'error',
                error: 'Bad request!',
            });
        }
        return res.status(200).json({ message: 'Food ad added' });
    });
}

function getFoodAds(req, res) {
    // return async(req, res, next) => {
    //     const page = parseInt(req.query.page)
    //     const limit = parseInt(req.query.limit)

    //     const startIndex = (page - 1) * limit
    //     const endIndex = page * limit

    //     const results = {}

    //     if (endIndex < await model.countDocuments().exec()) {
    //         results.next = {
    //             page: page + 1,
    //             limit: limit
    //         }
    //     }

    //     if (startIndex > 0) {
    //         results.previous = {
    //             page: page - 1,
    //             limit: limit
    //         }
    //     }
    //     try {
    //         console.log(req.query.type)
    //         if (req.query.type == -1) {
    //             results.items = await model.find()
    //                 .limit(limit)
    //                 .skip(startIndex)
    //                 .exec();
    //             res.paginatedResults = results
    //             next()
    //         } else if (req.query.type) {
    //             results.items = await model.find({ type: req.query.type })
    //                 .limit(limit)
    //                 .skip(startIndex)
    //                 .exec();
    //             res.paginatedResults = results
    //             next()
    //         }
    //     } catch (e) {
    //         res.status(500).json({ message: e.message })
    //     }
    // }
    Food.find({}, function(err, food) {
        //console.log(req)
        if (err) {
            return res.status(400).json({
                status: 'error',
                error: err,
            });
        } else {
            return res.status(200).json(food);
        }
    });
}