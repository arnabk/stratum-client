module.exports = (config) => {
  if (!config.server) {
    throw new Error('[server] required');
  }
  else if (!config.port) {
    throw new Error('[port] required');
  }
  else if (!config.worker) {
    throw new Error('[worker] required');
  }
};
