// eslint-disable-next-line new-cap
const router = require('express').Router();
const Film = require('../models/film');
const Review = require('../models/review');

router
  .post('/', (req, res, next) => {
    Film.create(req.body)
      .then(film => res.json(film))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Film.find()
      .lean()
      .limit(100)
      .then(films => res.json(films))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Promise.all([
      Film.findById(req.params.id)
        .populate('studio', 'name')
        .populate('cast.actor', 'name')
        .lean(),
      Review.find({ film: req.params.id })
        .select('rating, film, review, reviewer')
        .populate('reviewer', 'name')
        .lean(),
    ])
      .then(([film, reviews]) => {
        film.reviews = reviews;
        res.json(film);
      })
      .catch(next);
  })
;

module.exports = router;
