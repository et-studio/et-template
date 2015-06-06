'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _ = require('../util');
var NewNode = require('./new');

var IfNode = (function (_NewNode) {
  function IfNode() {
    _classCallCheck(this, IfNode);

    if (_NewNode != null) {
      _NewNode.apply(this, arguments);
    }
  }

  _inherits(IfNode, _NewNode);

  _createClass(IfNode, [{
    key: 'deliverUpdate',
    value: function deliverUpdate() {
      var _this = this;

      var re = [];
      var hasElse = false;
      var doms = this.getConditionDoms();
      var lastRoot = this.getLastRoot();
      var valueId = lastRoot.getValueId();
      var lineId = this.getLineId();

      re.push('var $line = doms.' + lineId + ';');
      _.each(doms, this, function (dom, i) {
        var removeList = _this.getRemoveList(doms, dom);
        var tag = _this.getTag(dom.nodeName);
        var condition = dom.condition ? '(' + dom.condition + ')' : '';
        var id = dom.getId();
        var args = dom.getArguments();

        re.push('' + tag + ' ' + condition + ' {\n          var et = doms.' + id + ';\n          if (last.' + valueId + ' !== ' + i + ') {\n            last.' + valueId + ' = ' + i + ';\n            if (!et) {\n              doms.' + id + ' = et = new ' + dom.templateName + '();\n            }\n            _util.before($line, et.get());\n\n            ' + removeList.join('') + '\n          }\n          et.update(' + args.join(',') + ');\n        }');

        if (tag === 'else') {
          hasElse = true;
        }
      });
      if (!hasElse) {
        this.pushDefaultElse(re, doms, valueId);
      }
      return re;
    }
  }, {
    key: 'getConditionDoms',
    value: function getConditionDoms() {
      var re = [this];
      var next = this.nextSibling;
      while (next) {
        if (next.nodeName === '#elseif') {
          re.push(next);
          next = next.nextSibling;
          continue;
        } else if (next.nodeName === '#else') {
          re.push(next);
        }
        break;
      }
      return re;
    }
  }, {
    key: 'pushDefaultElse',
    value: function pushDefaultElse(list, doms, valueId) {
      var removeList = this.getRemoveList(doms, null);
      var lastStr = list.pop();
      if (!lastStr) {
        throw new Error('there should has condition string.');
      }
      lastStr = '' + lastStr + ' else {\n      if (last.' + valueId + ' !== ' + doms.length + ') {\n        last.' + valueId + ' = ' + doms.length + ';\n        ' + removeList.join('') + '\n      }\n    }';
      list.push(lastStr);
      return list;
    }
  }, {
    key: 'getRemoveList',
    value: function getRemoveList(doms, current) {
      var re = [];
      _.each(doms, null, function (dom) {
        var id = dom.getId();
        var currentId = current && current.getId();
        if (dom !== current && id !== currentId) {
          re.push('\n          var et = doms.' + id + ';\n          if (et) {\n            et.remove();\n          }\n        ');
        }
      });
      return re;
    }
  }, {
    key: 'getTag',
    value: function getTag(nodeName) {
      switch (nodeName) {
        case '#if':
          return 'if';
        case '#elseif':
          return 'else if';
        case '#else':
          return 'else';
        default:
          throw new Error('Can\'t recognize ' + nodeName + ' in if condition.');
      }
    }
  }]);

  return IfNode;
})(NewNode);

module.exports = IfNode;