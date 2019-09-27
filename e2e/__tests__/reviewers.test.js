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
        .post('/api/reviews')
        .send({
          rating: 5,
          review: `"Fight Club" A celebration of violence in which the heroes write themselves a license to drink, smoke, screw and beat one another up.`,
          film: 0,
          reviewer: dude._id
        })
        .expect(200)
        .then(() => {
          return request.get(`/api/reviewers/${dude._id}`).expect(200);
        })
        .then(({ body }) => {
          return expect(body).toMatchInlineSnapshot(
            {
              _id: expect.any(String),
              reviews: [
                {
                  _id: expect.any(String)
                }
              ]
            },
            `
                    Object {
                      "__v": 0,
                      "_id": Any<String>,
                      "company": "At the Movies",
                      "name": "Roger Ebert",
                      "reviews": Array [
                        Object {
                          "_id": Any<String>,
                          "rating": 5,
                          "review": "\\"Fight Club\\" A celebration of violence in which the heroes write themselves a license to drink, smoke, screw and beat one another up.",
                        },
                      ],
                    }
                  `
          );
        });
    });
  });

  it('modifies a dude by id', () => {
    return postReviewer(ebert).then(dude => {
      return request
        .put(`/api/reviewers/${dude._id}`)
        .send({
          company: 'www.ebertpresents.com'
        })
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
                      "company": "www.ebertpresents.com",
                      "name": "Roger Ebert",
                    }
                  `
          );
        });
    });
  });
});
