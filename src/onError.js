const connect = require('./connect');

module.exports = (client, options, error) => {
  const { autoReconnectOnError, onError } = options;
  if (onError) onError(error);

  if (autoReconnectOnError) {
    connect(client, options);
  } else {
    client.destroy(); // kill client after server's response
  }
};
