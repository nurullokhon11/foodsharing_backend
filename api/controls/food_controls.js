var mongoose = require('mongoose');
const Food = require('../models/food');
const userControls = require('../controls/user_controls');

module.exports = {
    createFoodAd,
    getFoodAds,
    reserveFoodAd,
    updateFoodAdByQuery,
    changeVisibilityFoodAdByQuery
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
        return res.status(200).json(food);
    });
}

function reserveFoodAd(req, res) {
    console.log(req.query.id)
    const updates = req.body;
    const options = { new: true };
    Food.findByIdAndUpdate(req.query.id, updates, options,
        function(err, food) {
            console.log(food)
            if (err) {
                return res.status(404).json({
                    message: err,
                });
            } else {
                return res.status(200).json(food);
            }
        });
    // if (req.body.reserved) {
    //     Food.findByIdAndUpdate(req.body.id, updates, options,
    //         function(err, food) {
    //             if (err) {
    //                 return res.status(404).json({
    //                     status: 'error',
    //                     error: 'Not found',
    //                 });
    //             }
    //             console.log(food)
    //             if (food.reserved == false) {
    //                 food.reserved = true
    //                 food.markModified('reserved');
    //                 food.save(function(err, data) {
    //                     if (err) {
    //                         return res.status(400).json(err);
    //                     } else {
    //                         return res.status(200).json(data);
    //                     }
    //                 })
    //             } else {
    //                 return res.status(500).json({
    //                     status: 'error',
    //                     error: 'Already reserved',
    //                 });
    //             }

    //         });
}

function updateFoodAdByQuery(req, res) {
    const updates = req.body;
    Food.findOneAndUpdate(updates, { reserved: false }, function(err, food) {
        console.log(food)
        if (err) {
            return res.status(404).json({
                message: err,
            });
        } else {
            return res.status(200).json({ message: "Successfully edited" });
        }
    });
}

function changeVisibilityFoodAdByQuery(req, res) {
    const updates = req.body;
    Food.findOneAndUpdate(updates, { visibility: 0 }, function(err, food) {
        console.log(food)
        if (err) {
            return res.status(404).json({
                message: err,
            });
        } else {
            return res.status(200).json({ message: "Successfully edited" });
        }
    });
}
// if (req.body.visibility) {
//     Food.findOneAndUpdate({ id: req.body.id }, { visibility: req.body.visibility },
//         function(err) {
//             if (err) {
//                 return res.status(404).json({
//                     status: 'error',
//                     error: 'Not found',
//                 });
//             } else {
//                 return res.status(200).json({ message: 'This ad successfully updated' });
//             }
//         });
// } else if (req.body.reserved) {
//     Food.findOneAndUpdate({ id: req.body.id }, { reserved: req.body.reserved },
//         function(err) {
//             if (err) {
//                 return res.status(404).json({
//                     status: 'error',
//                     error: 'Not found',
//                 });
//             } else {
//                 return res.status(200).json({ message: 'This ad successfully updated' });
//             }
//         });
// } else
//     return res.status(500).json({
//         status: 'error',
//         error: 'Bad request',
//     });

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
    query = (req.query.type > 0) ? { type: parseInt(req.query.type), visibility: 1 } : { visibility: 1 };
    // if (req.query.type == -1) {
    //     Food.find().sort({ exp_date: 1 }, function(err, item) {
    //         if (err) {
    //             return res.status(400).json({
    //                 status: 'error',
    //                 error: err,
    //             });
    //         } else {
    //             return res.status(200).json({ items: item });
    //         }
    //     });
    // } else {
    Food.find(query, function(err, food) {
        //console.log(req)
        if (err) {
            return res.status(400).json({
                status: 'error',
                error: err,
            });
        } else {
            return res.status(200).json({ items: food });
        }
    });
    // }
}