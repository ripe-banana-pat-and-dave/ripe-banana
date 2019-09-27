const express = require('express');
const app = express();
// Load model plugins
require('./models/register-plugins');

// MIDDLEWARE
const morgan = require('morgan');
const checkConnection = require('./middleware/check-connection');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use(checkConnection);

// IS ALIVE TEST
app.get('/hello', (req, res) => res.send('Hello World!!!'));

// API ROUTES
const reviewers = require('./routes/reviewers');
app.use('/api/reviewers', reviewers);
const reviews = require('./routes/reviews');
app.use('/api/reviews', reviews);
const actors = require('./routes/actors');
app.use('/api/actors', actors);
const studios = require('./routes/studios');
app.use('/api/studios', studios);


module.exports = app;