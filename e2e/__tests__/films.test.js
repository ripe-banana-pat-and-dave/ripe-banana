const request = require('../request');
const db = require('../db');
const { postFilm } = require('../tests-setup');

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
      postFilm(ed, house, fightClub),
      postFilm(ed, house, fightClub)
    ])
      .then(() => {
        return request.get('/api/films').expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(3);
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
