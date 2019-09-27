const request = require('../request');
const db = require('../db');

describe('review api routes', () => {
  beforeEach(() => {
    return db.dropCollection('reviews');
  });

  const fightClub = {
    rating: 5,
    review: `"Fight Club" A celebration of violence in which the heroes write themselves a license to drink, smoke, screw and beat one another up.`,
    film: 0
  };
  const ebert = {
    name: 'Roger Ebert',
    company: 'At the Movies'
  };

  function postReview(review) {
    return request
      .post('/api/reviewers')
      .send(ebert)
      .expect(200)
      .then(({ body }) => {
        review.reviewer = body._id;
        return request
          .post('/api/reviews')
          .send(review)
          .expect(200);
      })
      .then(({ body }) => body);
  }

  it('posts a review', () => {
    return postReview(fightClub).then(review => {
      expect(review).toMatchInlineSnapshot(
        {
          _id: expect.any(String),
          reviewer: expect.any(String)
        },
        `
        Object {
          "__v": 0,
          "_id": Any<String>,
          "film": 0,
          "rating": 5,
          "review": "\\"Fight Club\\" A celebration of violence in which the heroes write themselves a license to drink, smoke, screw and beat one another up.",
          "reviewer": Any<String>,
        }
      `
      );
    });
  });

  it('gets a list of reviews', () => {
    return Promise.all([
      postReview(fightClub),
      postReview(fightClub),
      postReview(fightClub),
      postReview(fightClub)
    ])
      .then(() => {
        return request.get('/api/reviews').expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(4);
        expect(body[0]).toMatchInlineSnapshot(
          {
            _id: expect.any(String),
            reviewer: expect.any(String)
          },
          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "film": 0,
            "rating": 5,
            "review": "\\"Fight Club\\" A celebration of violence in which the heroes write themselves a license to drink, smoke, screw and beat one another up.",
            "reviewer": Any<String>,
          }
        `
        );
      });
  });
});
