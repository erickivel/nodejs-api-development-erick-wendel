const { deepEqual, ok } = require('assert');
const database = require('./database');

const DEFAULT_ITEM_REGISTER = {
  name: "Flash",
  power: "Speed",
  id: 1
}

const DEFAULT_ITEM_UPDATE = {
  name: "Green Lantern",
  power: "A Ring",
  id: 2
}


describe('manipulation heroes suite', () => {
  before(async () => {
    await database.register(DEFAULT_ITEM_REGISTER);
    await database.register(DEFAULT_ITEM_UPDATE);
  });

  it("should search for a hero using files", async () => {
    const expected = DEFAULT_ITEM_REGISTER;

    const [result, position2, position3] = await database.list(expected.id)
    // const positionOne = result[0]


    deepEqual(result, expected);
  });

  it("should register a hero, using files", async () => {
    const expected = DEFAULT_ITEM_REGISTER;
    const result = await database.register(DEFAULT_ITEM_REGISTER);

    const [actual] = await database.list(DEFAULT_ITEM_REGISTER.id);

    deepEqual(actual, expected);
  });

  it("should remove a hero by id", async () => {
    const expected = true;
    const result = await database.remove(DEFAULT_ITEM_REGISTER.id);
    deepEqual(result, expected);
  });

  it("should update a hero by id", async () => {
    const expected = {
      ...DEFAULT_ITEM_UPDATE,
      name: "Batman",
      power: "Money",
    }

    const newData = {
      name: "Batman",
      power: "Money",
    }

    await database.update(DEFAULT_ITEM_UPDATE.id, newData);
    const [result] = await database.list(DEFAULT_ITEM_UPDATE.id);

    deepEqual(result, expected);
  })
});