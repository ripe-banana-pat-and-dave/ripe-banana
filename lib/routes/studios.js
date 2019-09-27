// eslint-disable-next-line new-cap
const router = require('express').Router();
const Studio = require('../models/studio');

router
  .post('/', (req, res, next) => {
    Studio.create(req.body)
      .then(studio => res.json(studio))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Studio.find()
      .lean()
      .select('name')
      .then(studios => res.json(studios))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Promise.all([
      Studio.findById(req.params.id)
        .lean(),
      // Films.find({ actor: req.params.id })
      //   .select('rating review')
      //   .lean(),
    ])
      .then(([studio]) => {
        // studio.films = films;
        res.json(studio);
      })
      .catch(next);
  });


module.exports = router;