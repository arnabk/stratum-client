const {
  submitWork
} = require('./messageContants');

module.exports = (options) => {
  options.client.write(submitWork.replace("<worker.name>", options.worker_name).replace("<jobID>", options.job_id).replace("<ExtraNonce2>", options.extranonce2).replace("<ntime>", options.ntime).replace("<nonce>", options.nonce));
};
