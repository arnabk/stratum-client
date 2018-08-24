const { submitWork } = require('./messageContants');

module.exports = (client, data) => {
    console.log(submitWork.replace("<worker.name>", data.worker_name).replace("<jobID>", data.job_id).replace("<ExtraNonce2>", data.extranonce2).replace("<ntime>", data.ntime ).replace("<nonce>", data.nonce));
    client.write(submitWork.replace("<worker.name>", data.worker_name).replace("<jobID>", data.job_id).replace("<ExtraNonce2>", data.extranonce2).replace("<ntime>", data.ntime ).replace("<nonce>", data.nonce));
};











