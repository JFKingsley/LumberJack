var LumberJack = require('../main.js');

var lumberjack = new LumberJack('{{ SENTRY DSN }}', undefined, {logFile: './testLogfile.log', prefix: 'Lumberjack', timestamp: false, colors: true, ignoreLevelSentry: ['debug']});

lumberjack.info('This is a info log');

lumberjack.debug('This is a debug log', {withALittleExtra: 'data!'}, function(body) {
    console.log(body);
});

lumberjack.warn('Warning! This is a warn log');

lumberjack.error('Danger, Will Robinson, Danger! This is an error log', {crashReport: 'LostInSpace'});