const express = require('express');
const router = express.Router();

const User = require('../models/user')
const userControls = require('../controls/user_controls');

const Food = require('../models/food')
const foodControls = require('../controls/food_controls');

const FoodType = require('../models/food_type')
const foodTypeControls = require('../controls/food_type_controls');

// /* User */

// router.post('/createUser', function(req, res) {
//     userControls.create
// });
// router.post('/login', function(req, res) {
//     userControls.login
// });
// router.get('/getUserInfo', function(req, res) {
//     userControls.getUserInfo
// });
// router.get('/getUserFoodAds', function(req, res) {
//     userControls.getAllAdsByUserId
// });
// router.post('/addUserAd', function(req, res) {
//     userControls.addUserAd
// });

// /* Food */
// router.post('/createFoodAd', function(req, res) {
//     foodControls.createFoodAd
// });
// router.get('/getFoodAds', foodControls.getFoodAds(Food), (req, res) => {
//     res.json(res.paginatedResults)
// })

// /* Food types */
// router.post('/createFoodType', function(req, res) {
//     foodTypeControls.createFoodType
// });
// router.get('/getFoodTypes', function(req, res) {
//     foodTypeControls.getFoodTypes
// });

/* User */
router.post('/createUser', userControls.create);
router.post('/login', userControls.login);
router.get('/getUserInfo', userControls.getUserInfo)
router.get('/getUserFoodAds', userControls.getAllAdsByUserId)
router.post('/addUserAd', userControls.addUserAd)

/* Food */
router.post('/createFoodAd', foodControls.createFoodAd);
router.get('/getFoodAds', foodControls.getFoodAds);
// router.get('/getFoodAds', foodControls.getFoodAds(Food), (req, res) => {
//     res.json(res.paginatedResults)
// })

/* Food types */
router.post('/createFoodType', foodTypeControls.createFoodType);
router.get('/getFoodTypes', foodTypeControls.getFoodTypes);

module.exports = router;

module.exports = router