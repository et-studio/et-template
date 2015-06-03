'use strict';

class Util {
  each(array, context, callback) {
    var i, len;
    if (!array) {
      return;
    }
    for (i = 0, len = array.length; i < len; i++) {
      if (context) {
        callback.call(context, array[i], i, array);
      } else {
        callback(array[i], i, array);
      }
    }
  }
  _extendAB(A, B) {
    var key;
    if (A) {
      for (key in B) {
        A[key] = B[key];
      }
    }
    return A;
  }
  extend(arg1 = {}, ...list) {
    this.each(list, this, (item) => {
      this._extendAB(arg1, item);
    });
    return arg1;
  }
  _concatAB(arrayA, arrayB) {
    this.each(arrayB, null, (item) => {
      arrayA.push(item);
    });
    return arrayA;
  }
  concat(array, ...list) {
    this.each(list, this, (item) => {
      this._concatAB(array, item);
    });
    return array;
  }
  isEmpty(obj) {
    var keys = Object.keys(obj);
    return keys.length === 0;
  }
  contains(array, value) {
    var re = false;
    this.each(array, null, (item) =>{
      if (item === value) {
        re = true;
      }
    });
    return re;
  }
  uniq(array) {
    var re = [];
    this.each(array, this, (item) => {
      if (!this.contains(re, item)) {
        re.push(item);
      }
    });
    return re;
  }
}

module.exports = new Util();
