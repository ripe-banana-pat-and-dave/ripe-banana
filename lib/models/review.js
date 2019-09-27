const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredString, RequiredDescription, RequiredNumber, RequiredRating } = require('./required-types');

const reviewSchema = new Schema({
  rating: RequiredRating, 
  reviewer: RequiredString,
  review: RequiredDescription,
  film: RequiredNumber
});

const reviewModel = mongoose.model('Review', reviewSchema, 'reviews');

module.exports = reviewModel;