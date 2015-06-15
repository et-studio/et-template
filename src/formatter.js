'use strict';

class Formatter {
  format (str) {
    str = this.formatUtilMethod(str);
    str = this.formatVariable(str);
    return str
  }
  formatUtilMethod (str) {
    var re = str;
    return re;
  }
  formatVariable (str) {
    var re = str;
    return re;
  }
}

module.exports = new Formatter();
