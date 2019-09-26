const request = require('../request');
const db = require('../db');

describe('reviewer api', () => {
  beforeEach(() => {
    return db.dropCollection('reviewers');
  });

  const ebert = {
    name: 'Roger Ebert',
    company: 'At the Movies'
  };

  function postReviewer(dude) {
    return request
      .post('/api/reviewers')
      .send(dude)
      .expect(200)
      .then(({ body }) => body);
  }

  it('post a dude', () => {
    return postReviewer(ebert).then(dude => {
      expect(dude).toMatchInlineSnapshot(
        {
          _id: expect.any(String)
        },
        `
        Object {
          "__v": 0,
          "_id": Any<String>,
          "company": "At the Movies",
          "name": "Roger Ebert",
        }
      `
      );
    });
  });

  it('gets a dude by id', () => {
    return postReviewer(ebert).then(dude => {
      return request
        .get(`/api/reviewers/${dude._id}`)
        .expect(200)
        .then(({ body }) => {
          return expect(body).toMatchInlineSnapshot(
            {
              _id: expect.any(String)
            },
            `
                    Object {
                      "__v": 0,
                      "_id": Any<String>,
                      "company": "At the Movies",
                      "name": "Roger Ebert",
                    }
                  `
          );
        });
    });
  });
});
