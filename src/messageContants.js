module.exports = {

  authorizeMethod: "mining.authorize",
  authorize: '{"id":"mining.authorize","method":"mining.authorize","params":["<worker.name>","<worker.pass>"]}\n',

  subscribeMethod: "mining.subscribe",
  subscribe: '{"id": "mining.subscribe", "method": "mining.subscribe", "params": []}\n',

  miningDifficulty: "mining.set_difficulty",

  miningNotify: "mining.notify",

  submitMethod: "mining.submit",
  submitWork: '{"params": ["<worker.name>", "<jobID>", "<ExtraNonce2>", "<ntime>", "<nonce>"], "id": "mining.submit", "method": "mining.submit"}\n',

};