// eslint-disable-next-line new-cap
const router = require('express').Router();
const Actor = require('../models/actor');

router
  .post('/', (req, res, next) => {
    Actor.create(req.body)
      .then(actor => res.json(actor))
      .catch(next);
  });
  // .get('/:id', (req, res, next) => {
  //   Promise.all([
  //     Actor.findById(req.params.id)
  //       .lean(),
  //     // Films.find({ actor: req.params.id })
  //     //   .select('rating review')
  //     //   .lean(),
  //   ])
  //     .then(([actor, reviews]) => {
  //       actor.reviews = reviews;
  //       res.json(actor);
  //     })
  //     .catch(next);
  // });

module.exports = router;