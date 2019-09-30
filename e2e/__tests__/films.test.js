const request = require('../request');
const db = require('../db');
const { postFilm, postReview } = require('../tests-setup');

describe('film api routes', () => {
  beforeEach(() => {
    return db.dropCollection('films');
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

  it('posts a film', () => {
    return postFilm(ed, house, fightClub).then(film => {
      expect(film).toMatchInlineSnapshot(
        {
          _id: expect.any(String),
          studio: expect.any(String),
          cast: [
            {
              _id: expect.any(String),
              actor: expect.any(String)
            }
          ]
        },
        `
        Object {
          "__v": 0,
          "_id": Any<String>,
          "cast": Array [
            Object {
              "_id": Any<String>,
              "actor": Any<String>,
              "role": "The Narrator",
            },
          ],
          "released": 1999,
          "studio": Any<String>,
          "title": "Fight Club",
        }
      `
      );
    });
  });

  it('it gets films', () => {
    return Promise.all([
      postFilm(ed, house, fightClub),
      postFilm(ed, house, fightClub)
    ])
      .then(() => {
        return request.get('/api/films').expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(2);
        expect(body[0]).toMatchInlineSnapshot(
          {
            _id: expect.any(String),
            studio: expect.any(String),
            cast: [
              {
                _id: expect.any(String),
                actor: expect.any(String)
              }
            ]
          },
          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "cast": Array [
              Object {
                "_id": Any<String>,
                "actor": Any<String>,
                "role": "The Narrator",
              },
            ],
            "released": 1999,
            "studio": Any<String>,
            "title": "Fight Club",
          }
        `
        );
      });
  });
  it('it gets film by id', () => {
    return postReview(ed, house, ebert, fightClub, fightClubReview).then(
      review => {
        return request
          .get(`/api/films/${review.film}`)
          .expect(200)
          .then(({ body }) => {
            expect(body).toMatchInlineSnapshot(
              {
                _id: expect.any(String),
                studio: {
                  _id: expect.any(String)
                },
                cast: [
                  {
                    _id: expect.any(String),
                    actor: {
                      _id: expect.any(String)
                    }
                  }
                ],
                reviews: [
                  {
                    _id: expect.any(String),
                    reviewer: {
                      _id: expect.any(String)
                    }
                  }
                ]
              },
              `
              Object {
                "__v": 0,
                "_id": Any<String>,
                "cast": Array [
                  Object {
                    "_id": Any<String>,
                    "actor": Object {
                      "_id": Any<String>,
                      "name": "Edward Norton",
                    },
                    "role": "The Narrator",
                  },
                ],
                "released": 1999,
                "reviews": Array [
                  Object {
                    "_id": Any<String>,
                    "reviewer": Object {
                      "_id": Any<String>,
                      "name": "Roger Ebert",
                    },
                  },
                ],
                "studio": Object {
                  "_id": Any<String>,
                  "name": "Warner Bros. Studio",
                },
                "title": "Fight Club",
              }
            `
            );
          });
      }
    );
  });
});
