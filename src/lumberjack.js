'use strict';

var raven      = require('raven'),
    winston    = require('winston');

var LumberJack = function (sentry, suppliedWinston, options) {
  
    this.sentry = new raven.Client(sentry, {logger: 'LumberJack'});
  
    if(suppliedWinston === undefined) {
        this.winston = new (winston.Logger);
    }else{
        this.winston = suppliedWinston;
    }

    this.options = options;

    if(this.options.logFile !== undefined) {
        this.winston.add(winston.transports.File, {filename: this.options.logFile});
    }

    if(this.options.prefix !== undefined) {
        this.winston.add(winston.transports.Console, {
            json : false,
            timestamp : this.options.timestamp,
            label: this.options.prefix
        });
    }
};

LumberJack.prototype.info = function (message, extra) {
  this.log('info', message, extra);
};

LumberJack.prototype.debug = function (message, extra) {
  this.log('debug', message, extra);
};

LumberJack.prototype.warn = function (message, extra) {
  this.log('warn', message, extra);
};

LumberJack.prototype.error = function (message, extra) {
  this.log('error', message, extra);
};

LumberJack.prototype.getWinston = function() {
    return this.winston;
};

LumberJack.prototype.getSentry = function() {
    return this.sentry;
};

LumberJack.prototype.log = function(logLevel, message, extra) {
  if(typeof message !== 'string')
      return new Error('LumberJack: Failed to use non-string object for log message.');

  var color           = 'grey',
      winstonLogLevel = logLevel;

  if(this.options.colors === true) {
    switch (logLevel) {
        case 'info':
            color = 'green';
        break;

        case 'log':
            color = 'green';
        break;

        case 'debug':
            color = 'cyan';
        break;

        case 'warn':
            color = 'yellow';
        break;

        case 'error':
            color = 'red';
        break;

        default:
            color = 'grey';
        break;
    }
  }

  if(logLevel === 'debug')
      winstonLogLevel = 'info';

  if(this.winston !== undefined)
        this.winston.log(winstonLogLevel, message[color]);
  if(this.sentry !== undefined) 
        if(logLevel === 'error')
            this.sentry.captureError(new Error(message), {level: logLevel, extra: extra});
        else
            this.sentry.captureMessage(message, {level: logLevel, extra: extra});
};

module.exports = LumberJack;