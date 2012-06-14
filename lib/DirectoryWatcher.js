"use strict";

var fs = require("fs"),
    EventEmitter = require("events").EventEmitter,
    util = require("util");

/**
 * @param {!String} dirPath
 */
function DirectoryWatcher(dirPath) {

    EventEmitter.call(this);

    var dirStat = fs.statSync(dirPath), //Will throw an Error if there is no file on given path.
        fSWatcher,
        self = this;

    function __onChange(event, filename) {
        self.emit("dirChange", event, filename);
    }

    if (!dirStat.isDirectory()) {
        throw new Error("Directory can only handle directories, but " + dirPath + " given.");
    }

    fSWatcher = fs.watch(dirPath, __onChange);
}

util.inherits(DirectoryWatcher, EventEmitter);

module.exports = DirectoryWatcher;
