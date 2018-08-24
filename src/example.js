
const client = require('./index.js');
const Client = client({
  server: "grlcgang.com",
  port: 3333,
  worker: "KorkyMonster.testing",
  password: "x",
  autoReconnectOnError: true,
  onConnect: () => console.log('Connected to server'),
  onClose: () => console.log('Connection closed'),
  onError: (error) => console.log('Error', error.message),
  onAuthorizeSuccess: () => Client.submit(),
  onAuthorizeFail: () => console.log('WORKER FAILED TO AUTHORIZE OH NOOOOOO'),
  onNewDifficulty: (newDiff) => console.log('New difficulty', newDiff),
  onSubscribe: (subscribeData) => console.log('[Subscribe]', subscribeData),
  onNewMiningWork: (newWork) => console.log('[New Work]', newWork),
  onSubmitWorkSuccess: (error, result) => console.log("Yay! I submitted work successfully!"),
  onSubmitWorkFail: (error, result) => console.log("Aww! Error from pool was: " + error),
});

