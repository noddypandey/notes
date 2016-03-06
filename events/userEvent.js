const EventEmitter = require('events');

const util = require('util');

var UserEmitter = function() {
    EventEmitter.call(this);
}


util.inherits(UserEmitter, EventEmitter);
