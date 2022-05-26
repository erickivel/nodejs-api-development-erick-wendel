const assert = require('assert');
const MongoDB = require('./../db/strategies/mongodb');
const Context = require('./../db/strategies/base/contextStrategy');

const context = new Context(new MongoDB());

const MOCK_HERO_REGISTER = {
  name: 'Flash',
  power: 'Super Velocity',
}

describe('MongoDB test suite', () => {
  before(async () => {
    await context.connect();
    await context.create(MOCK_HERO_REGISTER);
  })

  it('should connect', async () => {
    const result = await context.isConnected();
    const expected = 'Connected';

    assert.deepEqual(result, expected);
  });

  it('should create', async () => {
    const { name, power } = await context.create(MOCK_HERO_REGISTER);
    const expected = MOCK_HERO_REGISTER;

    assert.deepEqual({ name, power }, expected);
  })

  it('should list', async () => {
    const [{ name, power }] = await context.read({ name: MOCK_HERO_REGISTER.name });
    const result = {
      name,
      power
    }

    const expected = MOCK_HERO_REGISTER;

    assert.deepEqual(result, expected);
  });
})