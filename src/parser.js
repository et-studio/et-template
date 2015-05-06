'use strict';

var $$state = undefined;
var TreeNode = function(nodeName, parent, prev, next) {
  return {
    nodeName: nodeName,
    node: null,
    parent: parent,
    prev: prev,
    next: next,
    children: []
  };
};
var tokenTree = {
  root: new TreeNode('root')
};
var treeHead = 'root';
var nodeStack = [];
var attrStack = [];
var stringStack = [];
var tokenStack = [];

var parserUtil = {
  getTags: function() {

  },
  stringNode: function(token) {
    stringStack.push(token);
    return 'stringNode';
  },
  getNodeBegin: function(token) {
    var nodeName, node;
    if(token === '00') {
      nodeName = tokenStack.toString();
      node = new TreeNode(nodeName);
      nodeStack.push(node);
      return;
    }
    tokenStack.push(token);
  },
  getNodeEnd: function(token) {

  },
  getAttributesKey: function(token) {

  },
  getAttributesValBegin: function() {

  },
  getAttributesVal: function(token) {

  }
};

function stateMachine(oldstate) {
  var newState;
  switch(oldstate) {
    //匹配扫描到<符号后再扫描到/的状态，即标签开始闭合
    case 'getTags06':
      newState = 'getNodeEnd'
      break;
    //匹配扫描到<符号后再扫描到符号表外字符的状态，即即将开始获取Node节点名
    case 'getTags-1':
      newState = 'getNodeBegin';
      break;
    //匹配上一情况后跟字符串的状态，即正在获取Node节点名
    case 'getNodeBegin-1':
      newState = 'getNodeBegin';
      break;
    //匹配上一情况后再扫描到空格的状态，即开始获取attribute名
    case 'getNodeBegin01':
      newState = 'getAttributesKey';
      break;
    case 'getNodeBegin05':
      newState = 'stringNode';
      break;
    //匹配上一情况后再跟符号表外字符的状态，即正在获取attribute名
    case 'getAttributesKey-1':
      newState = 'getAttributesKey';
      break;
    //
    case 'getAttributesKey02':
      newState = 'getAttributesValBegin';
      break;
    case 'getAttributesValBegin03':
      newState = 'getAttributesVal';
      break;
    case 'getAttributesVal-1':
    case 'getAttributesVal01':
      newState = 'getAttributesVal';
      break;
    case 'getAttributesVal03':
      newState = 'getNodeBegin';
      break;
    case 'stringNode00':
      newState = 'getTags';
      break;
    case 'stringNode-1':
    case 'stringNode01':
    case 'stringNode02':
    case 'stringNode03':
    case 'stringNode04':
    case 'stringNode05':
    case 'stringNode06':
      newState = 'stringNode';
      break;
  }
  return newState;
}

function autoMachine(token, pos) {
  var prestate, util, _state;
  $$state = $$state || 'stringNode';
  prestate = (pos === -1)? $$state + pos: _state + '0' + pos;
  _state = $$state = stateMachine(prestate);
  util = parserUtil[_state];
  util(token);
}

function Parser(str) {
  var endt ,len, pos, i, token;
  if(!str) {
    return;
  }
  endt = ['<', ' ', '=', '"', '\'', '>', '/'];
  for(i = 0; i < len; i++) {
    token = str.charAt(i);
    pos = token.indexOf(token);
    autoMachine(token, pos);
  }
}


module.exports = Parser;
