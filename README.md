# stratum-client
A NodeJS based stratum client for communication with stratum-capable pool.
Fork of [stratum-client](https://www.npmjs.com/package/stratum-client).

## Install
`npm i @marco_ciaramella/stratum-client`

## Usage
```javascript
const client = require('stratum-client');
const Client = client({
  server: "grlcgang.com",
  port: 3333,
  worker: "KorkyMonster.testing",
  password: "x",
  autoReconnectOnError: true,
  onConnect: () => console.log('Connected to server'),
  onClose: () => console.log('Connection closed'),
  onError: (error) => console.log('Error', error.message),
  onAuthorizeSuccess: () => console.log('Worker authorized'),
  onAuthorizeFail: () => console.log('WORKER FAILED TO AUTHORIZE OH NOOOOOO'),
  onNewDifficulty: (newDiff) => console.log('New difficulty', newDiff),
  onSubscribe: (subscribeData) => console.log('[Subscribe]', subscribeData),
  onNewMiningWork: (newWork) => console.log('[New Work]', newWork),
  onSubmitWorkSuccess: (error, result) => console.log("Yay! Our work was accepted!"),
  onSubmitWorkFail: (error, result) => console.log("Oh no! Our work was refused because: " + error)
});
```

Mining work can then be submitted through `Client.submit(worker, job_id, extranonce2, ntime, nonce);`.

If `password` is not specified, the client will attempt to authenticate with 'x', which is good enough in most cases.

DEPRECATED: `onAuthorize(error, result)`. If `onAuthorizeSuccess` or `onAuthorizeFail` is not provided, it will fall back to `onAuthorize`.
