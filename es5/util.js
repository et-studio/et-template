'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var privateUtil = {
  extendAB: function extendAB(A, B) {
    if (A) {
      for (var key in B) {
        A[key] = B[key];
      }
    }
    return A;
  },
  concatAB: function concatAB(arrayA, arrayB) {
    if (arrayA === undefined) arrayA = [];

    if (arrayB && typeof arrayB.forEach === 'function') {
      arrayB.forEach(function (item) {
        arrayA.push(item);
      });
    }
    return arrayA;
  }
};

var Util = (function () {
  function Util() {
    _classCallCheck(this, Util);
  }

  _createClass(Util, [{
    key: 'each',
    value: function each(array, callback) {
      if (!array) {
        return;
      }
      for (var i = 0, len = array.length; i < len; i++) {
        if (callback(array[i], i, array) === false) {
          break;
        }
      }
    }
  }, {
    key: 'extend',
    value: function extend() {
      for (var _len = arguments.length, list = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        list[_key - 1] = arguments[_key];
      }

      var arg1 = arguments[0] === undefined ? {} : arguments[0];

      this.each(list, function (item) {
        privateUtil.extendAB(arg1, item);
      });
      return arg1;
    }
  }, {
    key: 'concat',
    value: function concat(array) {
      for (var _len2 = arguments.length, list = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        list[_key2 - 1] = arguments[_key2];
      }

      this.each(list, function (item) {
        privateUtil.concatAB(array, item);
      });
      return array;
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty(obj) {
      if (!obj) {
        return true;
      }
      var keys = Object.keys(obj);
      return keys.length === 0;
    }
  }, {
    key: 'contains',
    value: function contains(array, value) {
      var re = false;
      this.each(array, function (item) {
        if (item === value) {
          re = true;
          return false;
        }
      });
      return re;
    }
  }, {
    key: 'clearArraySpace',
    value: function clearArraySpace(array) {
      var re = [];
      this.each(array, function (item) {
        if (item && typeof item.trim === 'function') {
          item = item.trim();
        }
        if (item) {
          re.push(item);
        }
      });
      return re;
    }
  }, {
    key: 'uniq',
    value: function uniq(array) {
      var re = [];
      var self = this;
      this.each(array, function (item) {
        if (!self.contains(re, item)) {
          re.push(item);
        }
      });
      return re;
    }
  }]);

  return Util;
})();

module.exports = new Util();