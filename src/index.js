// stratum+tcp://stratum.antpool.com
const net = require('net');
const extend = require('lodash/extend');
const connect = require('./connect');
const submitWork = require('./submitWork');
const onData = require('./onData');
const onError = require('./onError');
const validateConfig = require('./validateConfig');
const WorkObject = require('./workObject');

const defaultConfig = {
  "autoReconnectOnError": true
};

class Client {

  #client;

  constructor(options) {
    this.#start(options);
  }

  shutdown() {
    this.#client.end();
    this.#client.destroy();
  }

  submit(options) {
    const client = this.#client;
    submitWork({
      ...options,
      client
    });
  }

  #start(options) {
    const updatedOptions = extend({}, defaultConfig, options);

    validateConfig(updatedOptions);

    const workObject = new WorkObject();

    this.#client = new net.Socket();
    this.#client.setEncoding('utf8');

    connect(this.#client, updatedOptions);

    this.#client.on('data', data => onData(this.#client, updatedOptions, data, workObject));

    this.#client.on('error', error => onError(this.#client, updatedOptions, error));

    this.#client.on('close', () => {
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
        onSubmitWorkSuccess: null,
        onSubmitWorkFail: null,
      });
    });
  }

};

module.exports = (options) => new Client(options);
