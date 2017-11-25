const extend = require('lodash/extend');
const cloneDeep = require('lodash/cloneDeep');
const {
  authorizeMethod, authorize,
  subscribeMethod,
  miningDifficulty,
  miningNotify,
} = require('./messageContants');

module.exports = (client, updatedOptions, jsonData, workObject) => {
  const key = jsonData.method || jsonData.id;
  const { error, result, params } = jsonData;
  const {
    onAuthorize,
    onSubscribe,
    onNewDifficulty,
    worker,
    onNewMiningWork
  } = updatedOptions;

	switch (key) {
	  case authorizeMethod:
      if (onAuthorize) onAuthorize(error, result);
	    break;
    case miningDifficulty:
      if (params.length > 0) {
        workObject.miningDiff = params[0];
        if (onNewDifficulty) onNewDifficulty(params[0]);
      }
      break;
    case subscribeMethod:
      workObject.extraNonce1 = result[1];
      workObject.extraNonce2Size = result[2];
      if (onSubscribe) {
        onSubscribe({
          extraNonce1: workObject.extraNonce1,
          extraNonce2Size: workObject.extraNonce2Size,
        });
      }
      if (worker) {
        client.write(authorize.replace("<worker.name>", worker));
      }
      break;
    case miningNotify:
      {
        let index = -1;
        extend(workObject, {
          jobId: jsonData.params[++index],
          prevhash: jsonData.params[++index],
          coinb1: jsonData.params[++index],
          coinb2: jsonData.params[++index],
          merkle_branch: jsonData.params[++index],
          version: jsonData.params[++index],
          nbits: jsonData.params[++index],
          ntime: jsonData.params[++index],
          clean_jobs: jsonData.params[++index],
        });
        if (onNewMiningWork) onNewMiningWork(cloneDeep(workObject));
      }
      break;
	  default:
	    break;
	}
};
