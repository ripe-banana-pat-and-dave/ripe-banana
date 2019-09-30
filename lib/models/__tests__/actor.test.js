const Actor = require('../actor');

describe('Actor model', () => {
  it('creates a model from valid data', () => {
    const data = {
      name: 'Edward Norton',
      dob: 'August 18, 1969',
      pob: 'Boston, Massachusetts'
    };

    const actorModel = new Actor(data);
    const errors = actorModel.validateSync();
    expect(errors).toBeUndefined();

    const json = actorModel.toJSON();

    expect(json).toMatchInlineSnapshot(
      {
        _id: expect.any(Object),
        dob: expect.any(Date)
      },
      `
      Object {
        "_id": Any<Object>,
        "dob": Any<Date>,
        "name": "Edward Norton",
        "pob": "Boston, Massachusetts",
      }
    `
    );
  });
});
