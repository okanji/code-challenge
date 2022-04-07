const mongoose = require("mongoose");
const { getMockReq, getMockRes } = require("@jest-mock/express");
const { createPlace } = require("../controllers/places-controllers");
const User = require("../models/user");

jest.mock("express-validator", () => ({
  ...jest.requireActual("express-validator"),
  validationResult: () => ({ isEmpty: () => true }),
}));

jest.mock("../util/location", () => () => ({
  lat: 50.6783021,
  lng: -120.3636979,
}));

describe("Places Controllers", () => {
  let createdUser;

  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    createdUser = new User({
      name: "testName",
      email: "test@test3.com",
      image: "path/to/image",
      password: "12345678",
      places: [],
    });

    await createdUser.save();
    await mongoose.connection.db.createCollection("places");
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  it("Should create a place with type property", async () => {
    const req = getMockReq({
      body: {
        title: "Test title",
        description: "This is a test description",
        address: "983 Fernie Rd, Kamloops, BC",
        type: "office",
      },
      file: {
        path: "some/path",
      },
      userData: {
        userId: createdUser.id,
      },
    });

    const { res, next } = getMockRes();

    await createPlace(req, res, next);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        place: expect.objectContaining({
          type: "office",
        }),
      })
    );
  });
});
