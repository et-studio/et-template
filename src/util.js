'use strict';

class Util {
  each(array, callback) {
    if (!array) {
      return;
    }
    for (var i = 0, len = array.length; i < len; i++) {
      if (callback(array[i], i, array) === false) {
        break;
      }
    }
  }
  _extendAB(A, B) {
    if (A) {
      for (var key in B) {
        A[key] = B[key];
      }
    }
    return A;
  }
  extend(arg1 = {}, ...list) {
    var self = this;
    this.each(list, (item) => {
      self._extendAB(arg1, item);
    });
    return arg1;
  }
  _concatAB(arrayA = [], arrayB) {
    this.each(arrayB, (item) => {
      arrayA.push(item);
    });
    return arrayA;
  }
  concat(array, ...list) {
    var self = this;
    this.each(list, (item) => {
      self._concatAB(array, item);
    });
    return array;
  }
  isEmpty(obj) {
    var keys = Object.keys(obj);
    return keys.length === 0;
  }
  contains(array, value) {
    var re = false;
    this.each(array, (item) => {
      if (item === value) {
        re = true;
      }
    });
    return re;
  }
  clearArraySpace(array) {
    var re = [];
    this.each(array, (item) => {
      if (item && typeof item.trim === 'function') {
        item = item.trim();
      }
      if (item) {
        re.push(item);
      }
    });
    return re;
  }
  uniq(array) {
    var re = [];
    var self = this;
    this.each(array, (item) => {
      if (!self.contains(re, item)) {
        re.push(item);
      }
    });
    return re;
  }
}

module.exports = new Util();
