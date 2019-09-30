const request = require('../request');
const db = require('../db');
const { postActor, postFilm } = require('../tests-setup');

describe('actor api', () => {
  beforeEach(() => {
    return db.dropCollection('actors');
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

  it('post a dude', () => {
    return postActor(ed).then(dude => {
      expect(dude).toMatchInlineSnapshot(
        {
          _id: expect.any(String)
        },
        `
        Object {
          "__v": 0,
          "_id": Any<String>,
          "dob": "1969-08-18T07:00:00.000Z",
          "name": "Edward Norton",
          "pob": "Boston, Massachusetts",
        }
      `
      );
    });
  });

  it('gets an actor by id', () => {
    return postFilm(ed, house, fightClub).then(film => {
      console.log(film.cast[0].actor);
      return request
        .get(`/api/actors/${film.cast[0].actor}`)
        .expect(200)
        .then(({ body }) => {
          console.log(body);
          expect(body).toMatchInlineSnapshot(
            {
              _id: expect.any(String)
            },
            `
            Object {
              "__v": 0,
              "_id": Any<String>,
              "dob": "1969-08-18T07:00:00.000Z",
              "films": Array [
                Object {
                  "_id": "5d92405be8053f092012a6fc",
                  "title": "Fight Club",
                },
              ],
              "name": "Edward Norton",
              "pob": "Boston, Massachusetts",
            }
          `
          );
        });
    });
  });

  it('gets a list of actors', () => {
    return Promise.all([
      postActor(ed),
      postActor(ed),
      postActor(ed),
      postActor(ed)
    ])
      .then(() => {
        return request.get('/api/actors').expect(200);
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
            "name": "Edward Norton",
          }
        `
        );
      });
  });
});
