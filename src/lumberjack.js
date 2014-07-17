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

LumberJack.prototype.info = function (message, extra, callback) {
    if(callback === undefined) {
        callback = function(res) {};
    }
    this.log('info', message, extra, function(body) {
        callback(body);
    });
};

LumberJack.prototype.debug = function (message, extra, callback) {
    if(callback === undefined) {
        callback = function(res) {};
    }
    this.log('debug', message, extra, function(body) {
        callback(body);
    });
};

LumberJack.prototype.warn = function (message, extra, callback) {
    if(callback === undefined) {
        callback = function(res) {};
    }
    this.log('warn', message, extra, function(body) {
        callback(body);
    });
};

LumberJack.prototype.error = function (message, extra, callback) {
    if(callback === undefined) {
        callback = function(res) {};
    }
    this.log('error', message, extra, function(body) {
        callback(body);
    });
};

LumberJack.prototype.getWinston = function() {
    return this.winston;
};

LumberJack.prototype.getSentry = function() {
    return this.sentry;
};

LumberJack.prototype.log = function(logLevel, message, extra, callback) {
    if(typeof message !== 'string') {
        return new Error('LumberJack: Failed to use non-string object for log message.');
    }

    var color           = 'grey',
        sentry          = this.sentry,
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

    if(logLevel === 'debug') {
        winstonLogLevel = 'info';
    }

    if(logLevel === 'warn') {
        logLevel = 'warning';
    }

  this.winston.log(winstonLogLevel, message[color]);

  var sentryMsg  = require('strip-ansi')(message),
      sentryBody = {level: logLevel};

  if(extra !== undefined) {
        sentryBody.extra = extra;
  }else{
        sentryBody.extra = {};
  }

  if(this.options.stackTrace) {
        sentryBody.extra['Stack Trace'] = (new Error().stack);
  }

  if(this.options.ignoreLevelSentry !== undefined && this.options.ignoreLevelSentry.indexOf(winstonLogLevel) > -1) {
        return callback(null);
  }

  if(sentry !== undefined) {
        if(logLevel === 'error') {
            sentry.captureError(new Error(sentryMsg), sentryBody, function(result) {
                return callback(sentry.getIdent(result));
            });
        }else {
            sentry.captureMessage(sentryMsg, sentryBody, function(result) {
                return callback(sentry.getIdent(result));
            });
        }
    }
};

module.exports = LumberJack;