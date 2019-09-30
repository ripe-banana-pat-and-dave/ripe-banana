// eslint-disable-next-line new-cap
const router = require('express').Router();
const Studio = require('../models/studio');
const Film = require('../models/film');

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
      Film.find({ studio: req.params.id })
        .select('title')
        .lean(),
    ])
      .then(([studio, films]) => {
        studio.films = films;
        res.json(studio);
      })
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Film.find({ studio: req.params.id })
      .then(results => {
        if(results.length === 0) {
          Studio.findByIdAndRemove(req.params.id)
            .then(studio => res.json(studio));
        } else {
          res.status(400).send('Cannot remove studio');
        }
      })
      .catch(next);
  });



module.exports = router;