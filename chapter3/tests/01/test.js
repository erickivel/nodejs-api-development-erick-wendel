const assert = require('assert');
const { getPeople } = require('./service');

// install mock package, to simulate requests
const nock = require('nock');

describe('Star Wars test', () => {
  before(() => {
    const response = {
      count: 1,
      next: null,
      previous: null,
      results: [
        {
          name: 'R2-D2',
          height: '96',
          mass: '32',
          hair_color: 'n/a',
          skin_color: 'white, blue',
          eye_color: 'red',
          birth_year: '33BBY',
          gender: 'n/a',
          homeworld: 'https://swapi.dev/api/planets/8/',
          vehicles: [],
          starships: [],
          created: '2014-12-10T15:11:50.376000Z',
          edited: '2014-12-20T21:17:50.311000Z',
          url: 'https://swapi.dev/api/people/3/'
        }
      ]
    }

    nock('https://swapi.dev/api/people')
      .get('/?search=r2-d2&format=json')
      .reply(200, response);
  });

  it('should retrieve r2d2 with the correct format', async () => {
    const expected = [{ name: 'R2-D2', height: '96' }]
    const baseName = `r2-d2`;
    const result = await getPeople(baseName);
    assert.deepEqual(result, expected);
  });
});