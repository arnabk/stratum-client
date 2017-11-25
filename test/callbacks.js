const assert = require('assert');
const isArray = require('lodash/isArray');
const isObject = require('lodash/isObject');
const client = require('../');

describe('Test Stratum client[callbacks]', () => {
  // Test for onConnect getting called
  it('onConnect', (done) => {
    const handle = client({
      server: "stratum.slushpool.com",
      port: 3333,
      worker: "arnabk.1",
      onConnect: () => {
        handle.shutdown();
        done();
      },
    });
  });

  // Test for onClose getting called
  it('onClose', (done) => {
    const handle = client({
      server: "stratum.slushpool.com",
      port: 3333,
      worker: "arnabk.1",
      onConnect: () => handle.shutdown(),
      onClose: () => done(),
    });
  });

  // Test for onClose getting called TODO
  it('onAuthorize', (done) => {
    const handle = client({
      server: "stratum.slushpool.com",
      port: 3333,
      worker: "arnabk.1",
      onAuthorize: (error, result) => {
        assert.ok(result !== null);
        handle.shutdown();
        done();
      },
    });
  });

  // Test for onNewDifficulty getting called
  it('onNewDifficulty', (done) => {
    const handle = client({
      server: "stratum.slushpool.com",
      port: 3333,
      worker: "arnabk.1",
      onNewDifficulty: newDiff => {
        assert.ok(newDiff > 0);
        handle.shutdown();
      },
      onClose: () => done(),
    });
  });

  // Test for onSubscribe getting called
  it('onSubscribe', (done) => {
    let doneCalled = false;
    const handle = client({
      id: 'onSubscribeTest',
      server: "stratum.slushpool.com",
      port: 3333,
      worker: "arnabk.1",
      onSubscribe: (result) => {
        assert.ok(isObject(result) && result !== null);
        handle.shutdown();
      },
      onClose: () => {
        if (!doneCalled) {
          doneCalled = true;
          done();
        }
      },
    });
  });

  // // Test for onNewMiningWork getting called
  it('onNewMiningWork', (done) => {
    const handle = client({
      server: "stratum.slushpool.com",
      port: 3333,
      worker: "arnabk.1",
      onNewMiningWork: (workObject) => {
        assert.ok(isObject(workObject) && workObject !== null);
        handle.shutdown();
        done();
      },
    });
  });

});
