module.exports = class Debug {
  constructor(name) {
    this.debug = require("debug");
    this._error = this.debug(name + ":error");
    this._log = this.debug(name + ":log");
    this._file = this.debug(name + ":file");
    this._done = this.debug(name + ":done");
  }
  error(text) {
    this._error.enabled = true;
    this._error.color = 1;
    this._error(text);
  }
  log(text) {
    this._log.enabled = true;
    this._log.color = 4;
    this._log(text);
  }
  done(text) {
    this._done.enabled = true;
    this._done.color = 2;
    this._done(text);
  }
  file(text) {
    this._file.enabled = true;
    this._file.color = 7;
    this._file(text);
  }
};
