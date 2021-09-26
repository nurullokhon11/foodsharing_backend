const Food = require('../models/food');

var mongoose = require('mongoose'),
    User = mongoose.model('user');

module.exports = {
    create,
    getUserInfo,
    login,
    getAllAdsByUserId,
    addUserAd,
    updateUserInfo,
    deleteUserAd
};

function updateUserInfo(req, res) {
    const id = req.query.id;
    const updates = req.body;
    const options = { new: true };
    User.findByIdAndUpdate(id, updates, options,
        function(err, user) {
            if (err) {
                return res.status(404).json({
                    message: err,
                });
            } else {
                return res.status(200).json(user);
            }
        });
}

function getUserInfo(req, res) {
    User.findById(req.query.userId, function(err, user) {
        if (err) {
            return res.status(404).json({
                message: err,
            });
        } else {
            try {
                return res.status(200).json(user);
            } catch (e) {
                return res.status(404).json({
                    message: "User not found",
                });
            }
        }
    });
}

function create(req, res) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) {
            return res.status(500)
                .json({ message: "User already exist" })
        } else {
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password
            });
            user.save(function(err) {
                if (err) {
                    return res.status(400).json({
                        status: 'error',
                        error: 'Bad request!',
                    });
                } else {
                    return res.status(200).json({ message: 'User created' });
                }
            });
        }
    });
}


function login(req, res) {
    console.log(req.body.email)
    query = (req.body.email) ? { email: req.body.email } : {};
    User.findOne(query, function(err, user) {
        if (err) {
            res.status(404).json({ message: "Not found" })
        } else {
            if (user != null && user.password != null) {
                if (req.body.password == user.password) {
                    res.status(200).json({
                        username: user.username,
                        email: user.email,
                        phone: user.phone,
                        nickname: user.nickname,
                        id: user._id
                    })
                }
            } else {
                res.status(404).json({ message: "Not found" })
            }
        }
    });
}

function getAllAdsByUserId(req, res) {
    User.findById(req.query.userId, function(err, user) {
        if (err) {
            return res.status(404).json({
                message: err,
            });
        } else {
            try {
                var foods = user.foodAds
                var result = []
                for (var i = 0; i < foods.length; i++) {
                    if (foods[i].visibility == 1) {
                        result.push(foods[i])
                    }
                }
                return res.status(200).json(result);
            } catch (e) {
                return res.status(404).json({
                    foodAds: [],
                    message: e,
                });
            }
        }
    });
};

function deleteUserAd(req, res) {
    User.findById(req.query.userId, function(err, data) {
        if (err || typeof data == 'undefined') {
            return res.status(500).json({
                error: 'Bad request',
            });
        } else {
            var ads = data.foodAds
            var results = []
            for (var i = 0; i < ads.length; i++) {
                if (ads[i]._id != req.query.adId) {
                    results.push(ads[i])
                }
            }
            data.foodAds = results
            data.save(function(err) {
                if (err) {
                    res.send(err);
                    return res.status(404).json({
                        message: err,
                    });
                } else {
                    return res.status(200).json({
                        message: 'Food ad removed',
                    });
                }
            });
        }
    });
}

function addUserAd(req, res) {
    User.findById(req.query.userId, function(err, data) {
        if (err || typeof data == 'undefined') {
            return res.status(500).json({
                error: 'Bad request',
            });
        } else {
            var foodAd = new Food();
            foodAd = req.body
            data.foodAds.push(foodAd);
            data.save(function(err) {
                if (err) {
                    res.send(err);
                    return res.status(404).json({
                        message: 'User with this ID not found',
                    });
                } else {
                    return res.status(200).json({
                        message: 'Food ad added',
                    });
                }
            })
        }
    })
};