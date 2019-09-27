const { ObjectId } = require('mongoose').Types;
const Review = require('../review');

describe('Review model', () => {
  it('creates a model from valid data', () => {
    const data = {
      rating: 5,
      reviewer: new ObjectId(),
      review: `"Fight Club" A celebration of violence in which the heroes write themselves a license to drink, smoke, screw and beat one another up.`,
      film: 0
    };

    const reviewModel = new Review(data);
    const errors = reviewModel.validateSync();
    expect(errors).toBeUndefined();

    const json = reviewModel.toJSON();

    expect(json).toMatchInlineSnapshot(
      {
        _id: expect.any(Object),
        reviewer: expect.any(Object)
      },
      `
      Object {
        "_id": Any<Object>,
        "film": 0,
        "rating": 5,
        "review": "\\"Fight Club\\" A celebration of violence in which the heroes write themselves a license to drink, smoke, screw and beat one another up.",
        "reviewer": Any<Object>,
      }
    `
    );
  });
});
