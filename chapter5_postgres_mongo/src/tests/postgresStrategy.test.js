const assert = require('assert');
const Postgres = require('./../db/strategies/postgres');
const Context = require('./../db/strategies/base/contextStrategy');

const context = new Context(new Postgres());

const MOCK_HERO_REGISTER = { name: 'Night Hawk', power: "Arrows" }
const MOCK_HERO_UPDATE = { name: 'Batman', power: "Money" }

describe('Postgres Strategy', () => {
  before(async () => {
    await context.connect();
    await context.delete();
    await context.create(MOCK_HERO_UPDATE);
  });
  it('PostgresSQL Connection', async () => {
    const result = await context.isConnected();
    assert.equal(result, true);
  });

  it('should register a hero', async () => {
    const result = await context.create(MOCK_HERO_REGISTER);
    const expected = MOCK_HERO_REGISTER;
    delete result.id;
    assert.deepEqual(result, expected);
  });

  it('should read a hero', async () => {
    const [result] = await context.read({ name: MOCK_HERO_REGISTER.name });
    delete result.id;

    const expected = MOCK_HERO_REGISTER;

    assert.deepEqual(result, expected);
  });

  it('should update a hero', async () => {
    const [itemToBeUpdated] = await context.read({ name: MOCK_HERO_UPDATE.name });
    const newItem = {
      ...MOCK_HERO_UPDATE,
      name: "Wonder Woman"
    };

    const result = await context.update(itemToBeUpdated.id, newItem);

    const [itemUpdated] = await context.read({ id: itemToBeUpdated.id });

    assert.deepEqual(result, [1]);
    assert.deepEqual(itemUpdated.name, newItem.name);
  })

  it('should delete a hero by id', async () => {
    const [item] = await context.read({});
    const result = await context.delete(item.id);

    assert.deepEqual(result, 1);
  });
});
