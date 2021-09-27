const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api', require('./api/routes/routes'));

const PORT = process.env.PORT || 5000;

//'mongodb://localhost/Foodsharing';
// const dbURI = 'mongodb+srv://jenyasubbotina:ht3wmfCWlXrHNGik@food.dqcji.mongodb.net/foodsharing?retryWrites=true&w=majority';
// mongoose.connect(process.env.MONGODB_URI || dbURI, { useNewUrlParser: true })
//     .then(result => {
//         console.log('connected to db');
//     })
//     .catch(err => console.error(err));

//const url = process.env.MONGODB_URI || 'mongodb+srv://work:111111aaa@food.dqcji.mongodb.net/foodsharing?retryWrites=true&w=majority?authSource=admin';
const url = 'mongodb+srv://work:111111aaa@food.dqcji.mongodb.net/foodsharing?retryWrites=true&w=majority?authSource=admin' || 'mongodb://localhost/Foodsharingdb';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB Connection Error...'));

app.listen(PORT, () => {
    console.log("App is running on port " + PORT);
});

// var express = require('express'),
//     app = express(),
//     port = process.env.PORT || 3000,
//     FoodType = require('./api/models/food_type')
// Food = require('./api/models/food')
// User = require('./api/models/user');

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// mongoose = require('mongoose')
// mongoose.Promise = global.Promise;
// const url = 'mongodb+srv://jenyasubbotina:ht3wmfCWlXrHNGik@food.dqcji.mongodb.net/foodsharing?retryWrites=true&w=majority';
// mongoose.connect(url, { useNewUrlParser: true });
// mongoose.connection.on('error', console.error.bind(console, 'MongoDB Connection Error...'));

// // app.use(bodyParser.urlencoded({ extended: true }));
// // app.use(bodyParser.json());

// var routes = require('./api/routes/routes');
// app.use(routes);

// let server = app.listen(port);

// module.exports = server;

// console.log('todo list RESTful API server started on: ' + port);