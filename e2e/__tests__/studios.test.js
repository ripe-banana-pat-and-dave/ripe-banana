const request = require('../request');
const db = require('../db');
const { postStudio, postFilm } = require('../tests-setup');

describe('studio api', () => {
  beforeEach(() => {
    return db.dropCollection('studios');
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

  it('post a house', () => {
    return postStudio(house).then(house => {
      expect(house).toMatchInlineSnapshot(
        {
          _id: expect.any(String)
        },
        `
        Object {
          "__v": 0,
          "_id": Any<String>,
          "address": Object {
            "city": "Los Angeles",
            "country": "USA",
            "state": "CA",
          },
          "name": "Warner Bros. Studio",
        }
      `
      );
    });
  });

  it('gets a list of studios', () => {
    return Promise.all([
      postStudio(house),
      postStudio(house),
      postStudio(house),
      postStudio(house)
    ])
      .then(() => {
        return request.get('/api/studios').expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(4);
        expect(body[0]).toMatchInlineSnapshot(
          {
            _id: expect.any(String)
          },
          `
          Object {
            "_id": Any<String>,
            "name": "Warner Bros. Studio",
          }
        `
        );
      });
  });

  it('gets an studio by id', () => {
    return postFilm(ed, house, fightClub).then(film => {
      console.log(film);
      return request
        .get(`/api/studios/${film.studio}`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchInlineSnapshot(
            {
              _id: expect.any(String),
              films: [
                {
                  _id: expect.any(String)
                }
              ]
            },
            `
            Object {
              "__v": 0,
              "_id": Any<String>,
              "address": Object {
                "city": "Los Angeles",
                "country": "USA",
                "state": "CA",
              },
              "films": Array [
                Object {
                  "_id": Any<String>,
                  "title": "Fight Club",
                },
              ],
              "name": "Warner Bros. Studio",
            }
          `
          );
        });
    });
  });
});
