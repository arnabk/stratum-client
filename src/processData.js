const extend = require('lodash/extend');
const cloneDeep = require('lodash/cloneDeep');
const defaultTo = require('lodash/defaultTo');
const {
  authorizeMethod,
  authorize,
  subscribeMethod,
  miningDifficulty,
  miningNotify,
  submitMethod,
} = require('./messageContants');

module.exports = (client, updatedOptions, jsonData, workObject) => {
  const key = jsonData.method || jsonData.id;
  const {
    error,
    result,
    params,
  } = jsonData;
  const {
    onAuthorize,
    onAuthorizeSuccess,
    onAuthorizeFail,
    onSubscribe,
    onNewDifficulty,
    worker,
    password,
    onNewMiningWork,
    onSubmitWorkSuccess,
    onSubmitWorkFail,
  } = updatedOptions;
  switch (key) {
    case authorizeMethod:
      {
        const fnSuccess = onAuthorizeSuccess || onAuthorize || (() => {});
        const fnFailure = onAuthorizeFail || onAuthorize || (() => {});
        if (result) fnSuccess(error, result);
        else fnFailure(error, result);
      }
    case miningDifficulty:
      if (params && params.length > 0) {
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
        client.write(authorize.replace("<worker.name>", worker).replace("<worker.pass>", defaultTo(password, 'x')));
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
    case submitMethod:
      {
        const fnSuccess = onSubmitWorkSuccess || (() => {});
        const fnFailure = onSubmitWorkFail || (() => {});
        if (result) fnSuccess(error, result);
        else fnFailure(error, result);
      }
      break;
    default:
      break;
  }
};
