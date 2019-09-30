const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredString, OptionalDate, OptionalString } = require('./required-types');

const actorSchema = new Schema({
  name: RequiredString,
  dob: OptionalDate,
  pob: OptionalString
});

const actorModel = mongoose.model('Actor', actorSchema, 'actors');

module.exports = actorModel;