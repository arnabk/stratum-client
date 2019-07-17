# stratum-client
A NodeJS based stratum client for communication with stratum-capable pool.

## Installation

    $ npm i stratum-client --save

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
      onSubmitWorkFail: (error, result) => console.log("Oh no! Our work was refused because: " + error),
    });

Mining work can then be submitted through `Client.submit(["<worker>","<job_id>","<extranonce2>","<ntime>","<nonce>"]);` Worker must have been authorized correctly for work to register with a pool.

`worker` is required in order for `onNewMiningWork()` to receive new work continuously.

If `password` if not specified, the client will attempt to authenticate with 'x', which is good enough in most cases.

DEPRECATED: `onAuthorize(error, result)`. If `onAuthorizeSuccess` or `onAuthorizeFail` is not provided, it will fall back to `onAuthorize`.

## Development

    $ git clone https://github.com/arnabk/stratum-client
    $ cd stratum-client
    $ npm i

  For running int tests. Make sure that you use a valid stratum server details

    $ npm test

## Other information
The project is open for suggestion or feedback. If you notice any issues while developing or using this library, feel free to report it [here](https://github.com/arnabk/stratum-client/issues)


