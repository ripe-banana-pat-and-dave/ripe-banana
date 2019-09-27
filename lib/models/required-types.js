const RequiredString = {
  type: String,
  required: true
};

const RequiredDate = {
  type: Date,
  required: true
};

const RequiredNumber = {
  type: Number,
  required: true
};

const RequiredRating = {
  type: Number,
  required: true,
  min: 1,
  max: 5
};

const RequiredDescription = {
  type: String,
  required: true,
  maxlength: 140,
};

module.exports = {
  RequiredString,
  RequiredDate,
  RequiredNumber,
  RequiredRating,
  RequiredDescription
};