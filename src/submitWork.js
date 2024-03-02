const {
  submitWork
} = require('./messageContants');

module.exports = (worker, job_id, extranonce2, ntime, nonce) => {
  client.write(submitWork.replace("<worker.name>", worker).replace("<jobID>", job_id).replace("<ExtraNonce2>", extranonce2).replace("<ntime>", ntime).replace("<nonce>", nonce));
};
