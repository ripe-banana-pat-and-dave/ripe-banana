const request = require('../request');
const db = require('../db');

describe('film api routes', () => {
  beforeEach(() => {
    return db.dropCollection('films');
  });

  it.skip('posts a film', () => {
    return postFilm(fightClub).then(film => {
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
  
  it.skip('it gets films', () => {
    return Promise.all([
      postFilm(fightClub),
      postFilm(fightClub),
      postFilm(fightClub),
      postFilm(fightClub)
    ])
      .then(() => {
        return request.get('/api/films').expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(4);
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
  
});
