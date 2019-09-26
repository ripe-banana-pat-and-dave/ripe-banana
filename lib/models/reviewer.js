const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredString } = require('./required-types');

const reviewerSchema = new Schema({
  name: RequiredString,
  company: RequiredString,
});

const reviewerModel = mongoose.model('Reviewer', reviewerSchema, 'reviewers');

module.exports = reviewerModel;