// eslint-disable-next-line new-cap
const router = require('express').Router();
const Reviewer = require('../models/reviewer');
const Review = require('../models/review');

router
  .post('/', (req, res, next) => {
    Reviewer.create(req.body)
      .then(reviewer => res.json(reviewer))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Promise.all([
      Reviewer.findById(req.params.id)
        .lean(),
      Review.find({ reviewer: req.params.id })
        .select('rating review')
        .lean(),
    ])
      .then(([reviewer, reviews]) => {
        reviewer.reviews = reviews;
        res.json(reviewer);
      })
      .catch(next);
  })


  .put('/:id', ({ params, body }, res, next) => {
    Reviewer.updateById(params.id, body)
      .then(reviewer => res.json(reviewer))
      .catch(next);
  })
;

module.exports = router;
