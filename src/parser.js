'use strict';

var _ = require('./util');
var Machine = require('./machine');
var OriginNode = require('./nodes/origin');
var factory = require('./nodes/factory');

// @tableStart: origin
var originTableOptions = {
  states: ['text', 'tagEnd', 'closeEnd', 'tagStart', 'tag', 'strEnd', 'str{{', 'str\'', 'str\"', 'closeStart', 'close'],
  symbols: ['</', '<', '>', '[/#', '[#', ']', '{{', '}}', '\\\'', '\'', '\\"', '"', ' '],
  table: [
    {
      '0': 'closeStart',
      '1': 'tagStart',
      '2': 'tagEnd',
      '3': 'closeStart',
      '4': 'tagStart',
      '5': 'text',
      '6': 'text',
      '7': 'text',
      '8': 'text',
      '9': 'text',
      '10': 'text',
      '11': 'text',
      '12': 'text',
      '-1': 'text'
    },
    {
      '0': 'closeStart',
      '1': 'tagStart',
      '2': 'tagEnd',
      '3': 'closeStart',
      '4': 'tagStart',
      '5': 'text',
      '6': 'text',
      '7': 'text',
      '8': 'text',
      '9': 'text',
      '10': 'text',
      '11': 'text',
      '12': 'text',
      '-1': 'text'
    },
    {
      '0': 'closeStart',
      '1': 'tagStart',
      '2': 'tagEnd',
      '3': 'closeStart',
      '4': 'tagStart',
      '5': 'text',
      '6': 'text',
      '7': 'text',
      '8': 'text',
      '9': 'text',
      '10': 'text',
      '11': 'text',
      '12': 'text',
      '-1': 'text'
    },
    {
      '0': 'tag',
      '1': 'tag',
      '2': 'tag',
      '3': 'tag',
      '4': 'tag',
      '5': 'tag',
      '6': 'tag',
      '7': 'tag',
      '8': 'tag',
      '9': 'tag',
      '10': 'tag',
      '11': 'tag',
      '12': 'tag',
      '-1': 'tag'
    },
    {
      '0': 'tag',
      '1': 'tag',
      '2': 'tagEnd',
      '3': 'closeStart',
      '4': 'tagStart',
      '5': 'tagEnd',
      '6': 'str{{',
      '7': 'tag',
      '8': 'tag',
      '9': 'str\'',
      '10': 'tag',
      '11': 'str\"',
      '12': 'tag',
      '-1': 'tag'
    },
    {
      '0': 'tag',
      '1': 'tag',
      '2': 'tagEnd',
      '3': 'closeStart',
      '4': 'tagStart',
      '5': 'tagEnd',
      '6': 'str{{',
      '7': 'tag',
      '8': 'tag',
      '9': 'str\'',
      '10': 'tag',
      '11': 'str\"',
      '12': 'tag',
      '-1': 'tag'
    },
    {
      '0': 'str{{',
      '1': 'str{{',
      '2': 'str{{',
      '3': 'str{{',
      '4': 'str{{',
      '5': 'str{{',
      '6': 'str{{',
      '7': 'strEnd',
      '8': 'str{{',
      '9': 'str{{',
      '10': 'str{{',
      '11': 'str{{',
      '12': 'str{{',
      '-1': 'str{{'
    },
    {
      '0': 'str\'',
      '1': 'str\'',
      '2': 'str\'',
      '3': 'str\'',
      '4': 'str\'',
      '5': 'str\'',
      '6': 'str\'',
      '7': 'str\'',
      '8': 'str\'',
      '9': 'strEnd',
      '10': 'str\'',
      '11': 'str\'',
      '12': 'str\'',
      '-1': 'str\''
    },
    {
      '0': 'str\"',
      '1': 'str\"',
      '2': 'str\"',
      '3': 'str\"',
      '4': 'str\"',
      '5': 'str\"',
      '6': 'str\"',
      '7': 'str\"',
      '8': 'str\"',
      '9': 'str\"',
      '10': 'str\"',
      '11': 'strEnd',
      '12': 'str\"',
      '-1': 'str\"'
    },
    {
      '0': 'close',
      '1': 'close',
      '2': 'close',
      '3': 'close',
      '4': 'close',
      '5': 'close',
      '6': 'close',
      '7': 'close',
      '8': 'close',
      '9': 'close',
      '10': 'close',
      '11': 'close',
      '12': 'close',
      '-1': 'close'
    },
    {
      '0': 'close',
      '1': 'close',
      '2': 'closeEnd',
      '3': 'close',
      '4': 'close',
      '5': 'closeEnd',
      '6': 'close',
      '7': 'close',
      '8': 'close',
      '9': 'close',
      '10': 'close',
      '11': 'close',
      '12': 'close',
      '-1': 'close'
    }
  ]
};
// @tableEnd

var originMachine = new Machine(originTableOptions);

class Parser {
  constructor(options) {
    this.options = options;
  }
  parse(str) {
    var originNode = this.tranlateToOriginNode(str);
    return this.createDom(originNode);
  }
  tranlateToOriginNode(str) {
    var root = new OriginNode();

    var nodeOptions = {
      lineNumber: 0
    }
    var text = '';
    var closeName = '';
    var currentNode = root;
    var isTaging = false;
    var lineNumber = 0;
    originMachine.each(str, (state, token) => {
      if (token === '\n') {
        nodeOptions.lineNumber++;
      }
      switch (state) {
        case 'tagStart':
        case 'tagEnd':
        case 'closeStart':
          currentNode.saveSource(text, nodeOptions);
          text = '';
      }
      switch (state) {
        case 'text':
          text += token;
          break;
        case 'tag':
        case 'str{{':
        case 'str\'':
        case 'str\"':
        case 'strEnd':
          currentNode.addSource(token);
          break;
        case 'tagStart':
          currentNode = currentNode.createChild(token, nodeOptions);
          break;
        case 'tagEnd':
          currentNode.saveChildrenToExpressions();
          currentNode.addSource(token);
          break;
        case 'closeStart':
          closeName = '';
          break;
        case 'close':
          closeName += token;
          break;
        case 'closeEnd':
          currentNode = currentNode.closeNode(closeName);
          break;
        default:
          throw new Error(`The state: '${state}' is not defined.`)
      }
    });

    currentNode.saveSource(text, nodeOptions);
    root.closeAll();
    root.removeEmptyNode();
    return root;
  }
  createDom(originNode) {
    var index = 0;
    var createNode = (source, parent, previous, origin) => {
      var options = {
        index: index++,
        parent: parent,
        previous: previous
      }
      if (origin) {
        options.lineNumber = origin.lineNumber;
        options.expressions = origin.expressions;
      }

      var node = factory.create(source, options)
      return node;
    };
    var createChildren = (children = [], parent) => {
      var previous = null;
      _.each(children, (child) => {
        previous = createNode(child.source, parent, previous, child);
        createChildren(child.children, previous);
      });
      return parent;
    };
    var root = createNode();
    createChildren(originNode.children, root);
    root.initAll();
    return root;
  }
}
module.exports = Parser;
