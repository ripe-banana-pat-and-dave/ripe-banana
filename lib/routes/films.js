// eslint-disable-next-line new-cap
const router = require('express').Router();
const Film = require('../models/film');

router
  .post('/', (req, res, next) => {
    Film.create(req.body)
      .then(film => {
        // console.log(film);
        res.json(film);
      })
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Film.find()
      .lean()
      .limit(100)
      .then(films => res.json(films))
      .catch(next);
  })
;

module.exports = router;
