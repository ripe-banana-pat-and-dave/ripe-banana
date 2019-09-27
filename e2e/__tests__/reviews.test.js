const request = require('../request');
const db = require('../db');

describe('review api routes', () => {
  beforeEach(() => {
    return db.dropCollection('reviews');
  });

  const fightClub = {
    rating: 5,
    reviewer: 'Roger Ebert',
    review: `"Fight Club" A celebration of violence in which the heroes write themselves a license to drink, smoke, screw and beat one another up.`,
    film: 0
  };

  function postReview(review) {
    return request
      .post('/api/reviews')
      .send(review)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts a review', () => {
    return postReview(fightClub).then(review => {
      expect(review).toMatchInlineSnapshot(
        {
          _id: expect.any(String)
        },
        `
        Object {
          "__v": 0,
          "_id": Any<String>,
          "film": 0,
          "rating": 5,
          "review": "\\"Fight Club\\" A celebration of violence in which the heroes write themselves a license to drink, smoke, screw and beat one another up.",
          "reviewer": "Roger Ebert",
        }
      `
      );
    });
  });
});
