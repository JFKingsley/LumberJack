var LumberJack = require('../main.js');

var lumberjack = new LumberJack('https://bfaa14e07f664ae2bc4bdb48f0f7e485:a065759119024a8cbcb91d336a24703c@app.getsentry.com/26633', undefined, {logFile: './testLogfile.log', prefix: 'Lumberjack', timestamp: false, colors: true});

lumberjack.info('This is a info log');

lumberjack.debug('This is a debug log', {withALittleExtra: 'data!'});

lumberjack.warn('Warning! This is a warn log');

lumberjack.error('Danger, Will Robinson, Danger! This is an error log', {crashReport: 'LostInSpace'});