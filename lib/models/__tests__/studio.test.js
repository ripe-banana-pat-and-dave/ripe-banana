const Studio = require('../studio');

describe('Studio model', () => {
  it('creates a model from valid data', () => {
    const data = {
      name: 'Warner Bros. Studio',
      address: {
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA'
      }
    };

    const studioModel = new Studio(data);
    const errors = studioModel.validateSync();
    expect(errors).toBeUndefined();

    const json = studioModel.toJSON();

    expect(json).toMatchInlineSnapshot(
      {
        _id: expect.any(Object)
      },
      `
      Object {
        "_id": Any<Object>,
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
