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

    expect(json).toEqual({
      ...data,
      cast: [
        {
          _id: expect.any(Object),
          ...data.cast[0]
        },
        {
          _id: expect.any(Object),
          ...data.cast[1]
        }
      ],
      _id: expect.any(Object),
    });

  //   expect(json).toMatchInlineSnapshot(
  //     {
  //       _id: expect.any(Object),
  //       studio: expect.any(Object),
  //       cast: [
  //         {
  //           actor: expect.any(Object)
  //         }
  //       ]      
  //     },
  //     `
  //     Object {
  //       "_id": Any<Object>,
  //       "cast": Array [
  //         Object {
  //           "_id": "5d8e96c17e5b02405cddf3a1",
  //           "actor": "5d8e96c17e5b02405cddf39d",
  //           "role": "The Narrator",
  //         },
  //         Object {
  //           "_id": "5d8e96c17e5b02405cddf3a0",
  //           "actor": "5d8e96c17e5b02405cddf39e",
  //           "role": "Tyler Durden",
  //         },
  //       ],
  //       "released": 1999,
  //       "studio": Any<Object>,
  //       "title": "Fight Club",
  //     }
  //   `
  //   );

  });
});
