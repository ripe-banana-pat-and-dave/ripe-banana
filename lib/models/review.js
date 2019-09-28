const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const { RequiredDescription, RequiredRating } = require('./required-types');

const reviewSchema = new Schema({
  rating: RequiredRating, 
  reviewer: {
    type: ObjectId,
    ref: 'Reviewer'
  },
  review: RequiredDescription,
  film: {
    type: ObjectId,
    ref: 'Film'
  }
});

const reviewModel = mongoose.model('Review', reviewSchema, 'reviews');

module.exports = reviewModel;