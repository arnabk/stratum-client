const { subscribe } = require('./messageContants');

module.exports = (client, { port, server, onConnect }) => {
  client.connect(port, server, () => {
    client.write(subscribe);
    if (onConnect) {
      onConnect();
    }
  });
};
