const {
  submitWork
} = require('./messageContants');

module.exports = (options) => {
  options[5].write(submitWork.replace("<worker.name>", options[0]).replace("<jobID>", options[1]).replace("<ExtraNonce2>", options[2]).replace("<ntime>", options[3]).replace("<nonce>", options[4]));
};
