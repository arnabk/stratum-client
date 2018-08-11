// stratum+tcp://stratum.antpool.com
const net = require('net');
const extend = require('lodash/extend');
const connect = require('./connect');
const onData = require('./onData');
const onError = require('./onError');
const validateConfig = require('./validateConfig');
const WorkObject = require('./workObject');

const defaultConfig = {
  "autoReconnectOnError": true
};

class Client {

  start(options) {
    const client = new net.Socket();
    client.setEncoding('utf8');

    const updatedOptions = extend({}, defaultConfig, options);

    validateConfig(updatedOptions);

    const workObject = new WorkObject();

    connect(client, updatedOptions);

    client.on('data', data => onData(client, updatedOptions, data, workObject));

    client.on('error', error => onError(client, updatedOptions, error));

    client.on('close', () => {
      if (updatedOptions.onClose) updatedOptions.onClose();
      /*
        For some reason, corrupted data keeps streaming. This is a hack.
        With this hack, I am ensuring that no more callbacks are called
        after closing the connection (closing from our end)
      */
      extend(updatedOptions, {
        onConnect: null,
        onClose: null,
        onError: null,
        onAuthorize: null,
        onAuthorizeSuccess: null,
	      onAuthorizeFail: null,
        onNewDifficulty: null,
        onSubscribe: null,
        onNewMiningWork: null,
      });
    });

    return {
      shutdown: () => {
        client.end();
        client.destroy();
      },
    };
  }

};

module.exports = (options) => new Client().start(options);
