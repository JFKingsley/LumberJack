LumberJack
=====

![Lumberjack NPM](https://nodei.co/npm/lumberjack.png)

> LumberJack is a centralised logging system for NodeJS. It allows you to log to Winston, Sentry and many more systems (soon) from one centralised system.
### Install
```bash
$ npm install lumberjack
```

### Usage
```javascript
var LumberJack = require('lumberjack');

var DSN = '';
var logFileLocation = './lumberjack.log';
var sentry = undefined;
var prefix = 'Lumberjack';

var lumberjack = new LumberJack(DSN, sentry, {logFile: logFileLocation, prefix: prefix, timestamp: false, colors: true, ignoreLevelSentry: ['debug']});

lumberjack.info('This is a info log');

lumberjack.debug('This is a debug log', {withALittleExtra: 'data!'}, function(sentryID) {
    console.log(sentryID);
});

lumberjack.error('Danger, Will Robinson, Danger! This is an error log', {crashReport: 'LostInSpace'});
```

And done! It's that simple.

### Config

| Name               | Type                |
| -----------------: | -----------------:  |
| logfile            | String (File Path)  |
| timestamp          | Boolean             |
| colors             | Boolean             |
| stackTrace         | Boolean             |