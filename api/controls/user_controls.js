const Food = require('../models/food');

var mongoose = require('mongoose'),
    User = mongoose.model('user');

module.exports = {
    create,
    getUserInfo,
    login,
    getAllAdsByUserId,
    addUserAd
};

async function getUserInfo(req, res) {
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

async function create(req, res) {
    if (await User.findOne({ email: req.body.email })) {
        res.status(500).json({ message: "User already exist" })
    }
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    });

    if (await user.save()) {
        res.status(200).json({ message: "User created" })
    }
}

async function login(req, res) {
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

    // var user = await User.findOne({ email: req.body.email });
    // if (user) {
    //     if (req.body.password == user.password) {
    //         res.json({
    //             username: user.username,
    //             email: user.email,
    //             phone: user.phone,
    //             nickname: user.nickname,
    //             id: user._id
    //         })
    //     } else {
    //         res.status(404).json({ message: "Not found" })
    //     }
    // }
}

function getAllAdsByUserId(req, res) {
    User.findById(req.query.userId, function(err, user) {
        if (err) {
            return res.status(404).json({
                message: err,
            });
        } else {
            console.log(user.username)
            try {
                return res.status(200).json(user.foodAds);
            } catch (e) {
                return res.status(404).json({
                    foodAds: [],
                    message: e,
                });
            }
        }
    });
};

function addUserAd(req, res) {
    User.findById(req.body.userId, function(err, data) {
        if (err || typeof data == 'undefined') {
            return res.status(400).json({
                error: 'Bad request',
            });
        } else {
            var foodAd = new Food();
            foodAd = req.body;
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