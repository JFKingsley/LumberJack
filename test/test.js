var LumberJack = require('../main.js');

var lumberjack = new LumberJack('{{ Sentry DSN }}', undefined, {logFile: './testLogfile.log', prefix: 'ProDaemon', timestamp: false, colors: true});

lumberjack.info('This is a info log');

lumberjack.debug('This is a debug log', {withALittleExtra: 'data!'});

lumberjack.warn('Warning! This is a warn log');

lumberjack.error('Danger, Will Robinson, Danger! This is an error log', {crashReport: 'LostInSpace'});