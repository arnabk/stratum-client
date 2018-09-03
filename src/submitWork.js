const { submitWork } = require('./messageContants');

module.exports = (client, worker_name, job_id, extranonce2, ntime, nonce) => {
    console.log(submitWork.replace("<worker.name>", worker_name).replace("<jobID>", job_id).replace("<ExtraNonce2>", extranonce2).replace("<ntime>", ntime ).replace("<nonce>", nonce));
    client.write(submitWork.replace("<worker.name>", worker_name).replace("<jobID>", job_id).replace("<ExtraNonce2>", extranonce2).replace("<ntime>", ntime ).replace("<nonce>", nonce));
};











