module.exports = {

  authorizeMethod: "mining.authorize",
  authorize: '{"id":"mining.authorize","method":"mining.authorize","params":["<worker.name>","anything"]}\n',

  subscribeMethod: "mining.subscribe",
  subscribe: '{"id": "mining.subscribe", "method": "mining.subscribe", "params": []}\n',

  miningDifficulty: "mining.set_difficulty",

  miningNotify: "mining.notify",

};
