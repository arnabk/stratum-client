const connect = require('./connect');

module.exports = (client, options) => {
  const { autoReconnectOnClose, onClose } = options;
  if (onClose) onClose();

  if (autoReconnectOnClose) {
    connect(client, options);
  } else {
    client.destroy(); // kill client after server's response
  }
};
