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

  it.skip('gets a dude by id', () => {
    return postActor(ed).then(dude => {
      return request
        .post('/api/reviews')
        .send({
          rating: 5,
          review: `"Fight Club" A celebration of violence in which the heroes write themselves a license to drink, smoke, screw and beat one another up.`,
          film: 0,
          actor: dude._id
        })
        .expect(200)
        .then(() => {
          return request.get(`/api/actors/${dude._id}`).expect(200);
        })
        .then(({ body }) => {
          return expect(body).toMatchInlineSnapshot();
        });
    });
  });
});
