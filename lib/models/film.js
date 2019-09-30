const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const { RequiredString, RequiredNumber, OptionalString } = require('./required-types');

const filmSchema = new Schema({
  title: RequiredString,
  studio: {
    type: ObjectId,
    ref: 'Studio',
    required: true
  },
  released: RequiredNumber,
  cast: [{
    role: OptionalString,
    actor: {
      type: ObjectId,
      ref: 'Actor',
      required: true
    }
  }]
});

const filmModel = mongoose.model('Film', filmSchema, 'films');

module.exports = filmModel;