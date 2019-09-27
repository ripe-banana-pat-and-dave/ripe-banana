const request = require('../request');
const db = require('../db');

describe('actor api', () => {
  beforeEach(() => {
    return db.dropCollection('actors');
  });

  const ed = {
    name: 'Edward Norton',
    dob: 'August 18, 1969',
    pob: 'Boston, Massachusetts'
  };

  function postActor(dude) {
    return request
      .post('/api/actors')
      .send(dude)
      .expect(200)
      .then(({ body }) => body);
  }

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
    return postActor(ed).then(dude => {
      return request
        .get(`/api/actors/${dude._id}`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchInlineSnapshot(
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
