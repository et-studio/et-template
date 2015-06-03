'use strict';

class Cache {
  getCache(key) {
    if (this._cache) {
      return this._cache[key];
    }
  }
  saveCache(key, value) {
    if (!this._cache) {
      this._cache = {};
    }
    this._cache[key] = value;
  }
}

module.exports = Cache;
