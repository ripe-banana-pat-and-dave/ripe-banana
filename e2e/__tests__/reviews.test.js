const request = require('../request');
const db = require('../db');
const { postReview } = require('../tests-setup');

describe('review api routes', () => {
  beforeEach(() => {
    return db.dropCollection('reviews');
  });

  const ed = {
    name: 'Edward Norton',
    dob: 'August 18, 1969',
    pob: 'Boston, Massachusetts'
  };
  const house = {
    name: 'Warner Bros. Studio',
    address: {
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA'
    }
  };
  const fightClubReview = {
    rating: 5,
    review: `"Fight Club" A celebration of violence in which the heroes write themselves a license to drink, smoke, screw and beat one another up.`
  };
  const ebert = {
    name: 'Roger Ebert',
    company: 'At the Movies'
  };
  const fightClub = {
    title: 'Fight Club',
    released: 1999,
    cast: [
      {
        role: 'The Narrator'
      }
    ]
  };
  
  it('posts a review', () => {
    return postReview(ed, house, ebert, fightClub, fightClubReview).then(review => {
      expect(review).toMatchInlineSnapshot(
        {
          _id: expect.any(String),
          reviewer: expect.any(String),
          film: expect.any(String)
        },
        `
        Object {
          "__v": 0,
          "_id": Any<String>,
          "film": Any<String>,
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
      postReview(ed, house, ebert, fightClub, fightClubReview),
      postReview(ed, house, ebert, fightClub, fightClubReview)
    ])
      .then(() => {
        return request.get('/api/reviews').expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(2);
        expect(body[0]).toMatchInlineSnapshot(
          {
            _id: expect.any(String),
            reviewer: expect.any(String),
            film: expect.any(String)
          },
          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "film": Any<String>,
            "rating": 5,
            "review": "\\"Fight Club\\" A celebration of violence in which the heroes write themselves a license to drink, smoke, screw and beat one another up.",
            "reviewer": Any<String>,
          }
        `
        );
      });
  });
});
