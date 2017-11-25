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

    client.on('close', () => updatedOptions.onClose && updatedOptions.onClose());

    return {
      shutdown: () => client.destroy(),
    };
  }

};

module.exports = (options) => new Client().start(options);
