const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredString, OptionalString } = require('./required-types');

const studioSchema = new Schema({
  name: RequiredString,
  address: {
    city: OptionalString,
    state: OptionalString,
    country: OptionalString
  }
});

const studioModel = mongoose.model('Studio', studioSchema, 'studios');

module.exports = studioModel;