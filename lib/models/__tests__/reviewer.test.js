const Reviewer = require('../reviewer');

describe('Reviewer model', () => {
  it('creates a model from valid data', () => {
    const data = {
      name: 'Roger Ebert',
      company: 'At the Movies'
    };

    const reviewerModel = new Reviewer(data);
    const errors = reviewerModel.validateSync();
    expect(errors).toBeUndefined();

    const json = reviewerModel.toJSON();

    expect(json).toMatchInlineSnapshot(
      {
        _id: expect.any(Object)
      },
      `
      Object {
        "_id": Any<Object>,
        "company": "At the Movies",
        "name": "Roger Ebert",
      }
    `
    );
  });
});
