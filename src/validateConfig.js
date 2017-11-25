module.exports = (config) => {
  if (!config.server) {
    throw new Error('[server] required');
  }
  else if (!config.port) {
    throw new Error('[port] required');
  }
};
