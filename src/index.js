// stratum+tcp://stratum.antpool.com
const net = require('net');
const extend = require('lodash/extend');
const connect = require('./connect');
const submitWork = require('./submitWork');
const onData = require('./onData');
const onClose = require('./onClose');
const validateConfig = require('./validateConfig');
const WorkObject = require('./workObject');

const defaultConfig = {
  "autoReconnectOnClose": true,
};

const client = new net.Socket();
client.setEncoding('utf8');

class Client {
  submit(options) {
    submitWork({
      ...options,
      client,
    });
  }
  start(options) {
    const updatedOptions = extend({}, defaultConfig, options);

    validateConfig(updatedOptions);

    const workObject = new WorkObject();

    connect(client, updatedOptions);

    client.on('data', data => onData(client, updatedOptions, data, workObject));

    client.on('error', error => {
      if (updatedOptions.onError) updatedOptions.onError(error);
    });

    client.on('close', () => onClose(client, updatedOptions));

    return {
      client: client,
      submit: this.submit,
      shutdown: () => {
        client.end();
        client.destroy();
      },
    };
  }

};

module.exports = (options) => new Client().start(options);
