'use strict';
/**
Dom 类 模拟dom的树形结构
  id                 # 唯一id
  parent             # 父级dom

  source {           # 资源字符串
    origin: ''       # 原始字符串
    tag: ''          # 标签字符串
    beginTag: ''     # 开始标签字符串
    children: ''     # 子标签字符串
    endTag: ''       # 结束标签字符串
    text: ''         # 文本内容，只有文本 dom 才具备
  }

  type               # text html et root
  depth              # 计算 dom 深度
  children = []      # 子元素
**/

var _ = require('underscore');
var compilers = require('./compilers/index');

var ID_CONCATE = 'ET';
var BEGIN_TAG_REG = /<(\w+)[\S\s]*?>|\[(#\w*)[\S\s]*?\]/;
var END_TAG_REG = /<\/(\w+)?>|\[\/(#\w*)?\]/;

function Dom(str, parent, options) {
  if (!options) {
    options = {};
  }

  this.id = _.uniqueId(ID_CONCATE);
  this.parent = parent;
  this.children = [];

  this.source = this.parseSource(str, options.isSingle);
  this.type = this.calculateType(this.source);
  this.depth = this.calculateDepth(this.parent, this.type);
  this.createChildren(this.source.children);

  // init compiler
  _.extend(this, compilers.getCompiler(this.source));
  this.initCompiler(options);
}
Dom.prototype = {
  // start: 解析link对象函数
  parseSource: function parseSource(str, isSingle) {
    var re = {
      origin: str,
      tag: '',
      beginTag: '',
      children: '',
      endTag: '',
      text: ''
    };
    var list = !!isSingle ? [] : this.split(str);
    var match = BEGIN_TAG_REG.exec(str);
    if (list.length > 1) {
      re.children = str;
    } else if (match) {
      var tag = match[1] || match[2];
      var domList = this.parseDomList(str, tag);
      re.tag = tag;
      re.beginTag = match[0];
      re.children = domList[1];
      re.endTag = domList[2];
    } else {
      re.text = str;
    }
    return re;
  },
  parseDomList: function parseDomList(str, tag) {
    // 把一个dom字符串解析成 [begin, children, end]
    var re = [];
    var isEtDom = tag.indexOf('#') === 0;
    var beginReg, endReg, beginMatch, endMatch;
    if (!str) {
      str = '';
    } else {
      str = str.trim();
    }

    if (isEtDom) {
      beginReg = new RegExp('^\\[' + tag + '[\\S\\s]*?\\]');
      endReg = new RegExp('\\[\\/' + tag + '\\]$');
    } else {
      beginReg = new RegExp('^<' + tag + '[\\S\\s]*?>');
      endReg = new RegExp('<\\/' + tag + '>$');
    }
    if (!(beginMatch = beginReg.exec(str)) || !(endMatch = endReg.exec(str))) {
      this.throwError(str);
    }
    re.push(beginMatch[0]);
    re.push(str.replace(beginReg, '').replace(endReg, ''));
    re.push(endMatch[0]);
    return re;
  },
  calculateType: function calculateType(source) {
    var re = 'root';
    if (source.text) {
      re = 'text';
    } else if (source.tag.indexOf('#') === 0) {
      re = 'et';
    } else if (source.tag) {
      re = 'html';
    }
    return re;
  },
  calculateDepth: function calculateDepth(parent, type) {
    var parentDepth = parent && parent.depth || 0;
    var increment = type === 'html' || type === 'text' ? 1 : 0;
    return parentDepth + increment;
  },
  createChildren: function createChildren(str) {
    str = str || '';
    var list = this.split(str);
    for (var i = 0; i < list.length; i++) {
      var tmp = list[i];
      if (tmp) {
        this.children.push(new Dom(tmp, this, {
          isSingle: true
        }));
      }
    }
    return this;
  },
  split: function split(str) {
    // 拆分函数，把str拆成dom数组
    var list, halves;
    str = str || '';
    list = [];
    str = str.trim();
    while (str) {
      halves = this.splitHalves(str);
      if (halves[0]) {
        list.push(halves[0]);
      }
      str = halves[1];
    }
    return list;
  },
  splitHalves: function splitHalves(str) {
    // 拆分函数 把str的第一个dom单元拆出来
    str = str || '';
    var re = [],
      position,
      count,
      first,
      rest,
      index;
    var match = BEGIN_TAG_REG.exec(str);
    if (!match) {
      re.push(str);
      re.push('');
    } else if ((index = match.index) !== 0) {
      re.push(str.substring(0, index));
      re.push(str.substring(index));
    } else {
      count = 0;
      first = '';
      rest = str;
      while (rest) {
        var beginMatch = BEGIN_TAG_REG.exec(rest);
        var endMatch = END_TAG_REG.exec(rest);
        if (beginMatch && !endMatch || beginMatch && endMatch && beginMatch.index < endMatch.index) {
          // 先遇见开始标签
          count++;
          position = beginMatch.index + beginMatch[0].length;
          first = first + rest.substring(0, position);
          rest = rest.substring(position);
        } else if (!beginMatch && endMatch || beginMatch && endMatch && beginMatch.index > endMatch.index) {
          // 先遇见结束标签
          count--;
          position = endMatch.index + endMatch[0].length;
          first = first + rest.substring(0, position);
          rest = rest.substring(position);
          if (count === 0) {
            if (match[1] !== endMatch[1] || match[2] !== endMatch[2]) {
              this.throwError(str);
            }
            break;
          }
        } else {
          // 其他
          first += rest;
          rest = '';
        }
      }
      if (count !== 0) {
        this.throwError(str);
      }
    }

    re.push(first);
    re.push(rest);
    return re;
  },
  throwError: function throwError(str) {
    // 抛出错误异常
    if (!str) {
      str = 'html';
    }
    throw new Error('Format of ' + str + ' string is wrong.');
  }
// end: 解析link对象函数
};

module.exports = Dom;