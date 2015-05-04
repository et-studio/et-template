'use strict';

var state = 0;
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
console.log(tokenTree);
var treeHead = 'root';
var nodeStack = [];
var attrStack = [];
var stringStack = [];
var tokenStack = [];

var parserUtil = {
  stringNode: function(token) {
    stringStack.push(token);
    return 'stringNode';
  },
  getNode: function(token) {
    var nodeName, node;
    if(token === '00') {
      nodeName = tokenStack.toString();
      node = new TreeNode(nodeName);
      nodeStack.push(node);
      return;
    }
    tokenStack.push(token);
  },
  getAttributesKey: function(token) {

  },
  getAttributesVal: function(token) {

  }
};

function stateMachine(oldstate) {
  var newState;
  switch(oldstate) {
    case 'stringNode-1':

      break;
    case 'getNode00':

      break;
    case 'getNode01':

      break;
    case 'getAttributes0':

      break;
  }
}

function autoMachine(token, pos) {
  var prestate, util, _state;
  state = state || 'stringNode';
  prestate = (pos === -1)? _state + pos: _state + '0' + pos;
  _state = stateMachine(prestate);
  util = parserUtil[_state];
  util(token);
  // switch(pos) {
  //     case -1:
  //       _state = 'stringNode';
  //       break;
  //     case 0:
  //       _state = 'getNode';
  //       break;
  //     case 1:
  //       _state = (_state === 'getNode')? 'getAttributesKey': _state;
  //       break;
  //     case 2:
  //       _state = (_state === 'getAttributesKey')? 'getAttributesValBegin': _state;
  //       break;
  //     case 3:
  //       _state = (_state === 'getAttributesValBegin')? 'getAttributesVal': _state;
  //       break;
  //     case 4:

  //       break;
  //     case 5:

  //       break;
  //     case 6:

  //       break;
  //   }
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