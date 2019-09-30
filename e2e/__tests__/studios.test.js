const request = require('../request');
const db = require('../db');
const { postStudio } = require('../tests-setup');

describe('studio api', () => {
  beforeEach(() => {
    return db.dropCollection('studios');
  });

  const house = {
    name: 'Warner Bros. Studio',
    address: {
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA'
    }
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
    return postStudio(house).then(house => {
      return request
        .get(`/api/studios/${house._id}`)
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
  });
});
