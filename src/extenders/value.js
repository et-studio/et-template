'use strict';

var STATES = {
  START: 0,
  END: 1,
  OTHER: 2
};

module.exports = {
  checkErraticValue: function isErraticValue(str) {
    var start = str.indexOf('{{');
    var end = str.indexOf('}}');
    return start >= 0 && end > start;
  },
  handleStart: function(lastState) {
    switch (lastState) {
      case STATES.START:
        return STATES.START;
      case STATES.END:
        throw new Error('lastState could not be end');
      default:
      return STATES.START;
    }
  },
  handleEnd: function(lastState) {
    switch (lastState) {
      case STATES.START:
        return STATES.END;
      case STATES.END:
        throw new Error('lastState could not be end');
      default:
        return STATES.OTHER;
    }
  },
  handleOther: function handleOther(lastState) {
    switch (lastState) {
      case STATES.START:
        return STATES.START;
      case STATES.END:
        throw new Error('lastState could not be end');
      default:
        return STATES.OTHER;
    }
  },
  getState: function(lastState, str) {
    switch (str) {
      case '{{':
        return this.handleStart(lastState);
      case '}}':
        return this.handleEnd(lastState);
      default:
        return this.handleOther(lastState);
    }
  },
  splitValue: function getValueList(str) {
    var re, i, len, lastChar, char, part, state, startIndex, endIndex, tmp;

    re = [];
    part = '';
    state = STATES.OTHER;
    lastChar = '';
    for (i = 0, len = str.length; i < len; i++) {
      char = str[i];
      part += char;
      state = this.getState(state, lastChar + char);
      if (state === STATES.END) {
        startIndex = part.lastIndexOf('{{');
        endIndex = part.lastIndexOf('}}');

        tmp = part.substring(0, startIndex);
        if (tmp) {
          re.push(`'${tmp}'`);
        }
        tmp = part.substring(startIndex + 2, endIndex);
        if (tmp) {
          re.push(tmp);
        }
        lastChar = '';
        part = '';
        state = STATES.OTHER;
      } else {
        lastChar = char;
      }
    }
    if (part) {
      re.push(`'${part}'`);
    }
    return re;
  },
  compileValue: function compileValue(str) {
    // 'xxx{{it.getSrc()}}bbb{{it.src2}}'
    // ('xxx' + it.getSrc() + 'bbb' + it.src2)
    var list = this.splitValue(str);
    var re = list.join('+');
    return `(${re})`;
  }
};
