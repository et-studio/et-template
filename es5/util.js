'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Util = (function () {
  function Util() {
    _classCallCheck(this, Util);
  }

  _createClass(Util, [{
    key: 'each',
    value: function each(array, context, callback) {
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
  }, {
    key: '_extendAB',
    value: function _extendAB(A, B) {
      var key;
      if (A) {
        for (key in B) {
          A[key] = B[key];
        }
      }
      return A;
    }
  }, {
    key: 'extend',
    value: function extend() {
      var _this = this;

      for (var _len = arguments.length, list = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        list[_key - 1] = arguments[_key];
      }

      var arg1 = arguments[0] === undefined ? {} : arguments[0];

      this.each(list, this, function (item) {
        _this._extendAB(arg1, item);
      });
      return arg1;
    }
  }, {
    key: '_concatAB',
    value: function _concatAB(arrayA, arrayB) {
      this.each(arrayB, null, function (item) {
        arrayA.push(item);
      });
      return arrayA;
    }
  }, {
    key: 'concat',
    value: function concat(array) {
      var _this2 = this;

      for (var _len2 = arguments.length, list = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        list[_key2 - 1] = arguments[_key2];
      }

      this.each(list, this, function (item) {
        _this2._concatAB(array, item);
      });
      return array;
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty(obj) {
      var keys = Object.keys(obj);
      return keys.length === 0;
    }
  }, {
    key: 'contains',
    value: function contains(array, value) {
      var re = false;
      this.each(array, null, function (item) {
        if (item === value) {
          re = true;
        }
      });
      return re;
    }
  }, {
    key: 'uniq',
    value: function uniq(array) {
      var _this3 = this;

      var re = [];
      this.each(array, this, function (item) {
        if (!_this3.contains(re, item)) {
          re.push(item);
        }
      });
      return re;
    }
  }]);

  return Util;
})();

module.exports = new Util();