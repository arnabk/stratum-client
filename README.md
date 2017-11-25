# stratum-client
A NodeJS based stratum client for communication with stratum pool

# Installation

    $ npm i stratum-client --save

    const client = require('stratum-client');
    client({
      server: "stratum.slushpool.com",
      port: 3333,
      worker: "arnabk.1",
      autoReconnectOnError: true,
      onConnect: () => console.log('Connected to server'),
      onClose: () => console.log('Connection closed'),
      onError: (error) => console.log('Error', error.message),
      onAuthorize: () => console.log('Worker authorized'),
      onNewDifficulty: (newDiff) => console.log('New difficulty', newDiff),
      onSubscribe: (subscribeData) => console.log('[Subscribe]', subscribeData),
      onNewMiningWork: (newWork) => console.log('[New Work]', newWork),
    });

**worker** is required in order for `onNewMiningWork()` to receive new work continuously

# Development

    $ git clone https://github.com/arnabk/stratum-client
    $ cd stratum-client
    $ npm i

  For running int tests. Make sure that you use a valid stratum server details

    $ npm int-test

# Other information
The project is open for suggestion or feedback. If you notice any issues while developing or using this library, feel free to report it [here](https://github.com/arnabk/stratum-client/issues)
