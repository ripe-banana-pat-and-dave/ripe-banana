const request = require('../request');
const db = require('../db');

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
      // {
      //   role: 'Tyler Durden',
      // }
    ]
  };

  function postFilm(film) {
    return request
      .post('/api/actors')
      .send(ed)
      .expect(200)
      .then(({ body }) => {
        film.cast[0].actor = body._id;
        return request
          .post('/api/studios')
          .send(house)
          .expect(200)
          .then(({ body }) => {
            film.studio = body._id;
            return request
              .post('/api/films')
              .send(film)
              .expect(200);
          });
      })
      .then(({ body }) => body);
  }

  it('posts a film', () => {
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

});
