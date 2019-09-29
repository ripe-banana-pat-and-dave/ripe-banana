const { ObjectId } = require('mongoose').Types;
const Film = require('../film');

describe('Film model', () => {
  it('creates a model from valid data', () => {
    const data = {
      title: 'Fight Club',
      studio: new ObjectId(),
      released: 1999,
      cast: [
        {
          role: 'The Narrator',
          actor: new ObjectId()
        },
        {
          role: 'Tyler Durden',
          actor: new ObjectId()
        }
      ]
    };

    const filmModel = new Film(data);
    const errors = filmModel.validateSync();
    expect(errors).toBeUndefined();

    const json = filmModel.toJSON();

    expect(json).toMatchInlineSnapshot(
      {
        _id: expect.any(Object),
        studio: expect.any(Object),
        cast: [
          {
            _id: expect.any(Object),
            actor: expect.any(Object)
          },
          {
            _id: expect.any(Object),
            actor: expect.any(Object)
          }
        ]
      },
      `
      Object {
        "_id": Any<Object>,
        "cast": Array [
          Object {
            "_id": Any<Object>,
            "actor": Any<Object>,
            "role": "The Narrator",
          },
          Object {
            "_id": Any<Object>,
            "actor": Any<Object>,
            "role": "Tyler Durden",
          },
        ],
        "released": 1999,
        "studio": Any<Object>,
        "title": "Fight Club",
      }
    `
    );
  });
});
