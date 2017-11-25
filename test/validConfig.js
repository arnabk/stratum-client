const assert = require('assert');
const client = require('../');

describe('Test Stratum client[validConfig]', () => {
  // Test with missing required field port
  it('#server', () => {
    assert.throws(() => client({
      server: 'host',
    }), Error);
  });

  // Test with missing required field server
  it('#port', () => {
    assert.throws(() => client({
      port: 8080,
    }), Error);
  });

  // Test with missing required field worker
  it('#worker', () => {
    assert.throws(() => client({
      port: 8080,
    }), Error);
  });
});
