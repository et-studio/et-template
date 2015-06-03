'use strict';

var valueHandler = require('./value');
var Basic = require('./basic');

class TextNode extends Basic {
  deliverCreate() {
    var re = [];
    var id = this.getId();
    var text = this.getTextContent();
    var parentId = this.parent && this.parent.getId();

    if (valueHandler.isErraticValue(text)) {
      re.push(`var ${id} = _util.createTextNode('');`);
    } else {
      re.push(`var ${id} = _util.createTextNode('${text}');`);
    }
    re.push(`doms.${id} = ${id};`);

    if (this.checkRoot()) {
      re.push(`rootIds.push('${id}');`);
      re.push(`roots.${id} = ${id};`);
    } else {
      re.push(`_util.appendChild(${parentId}, ${id});`);
    }
    return re;
  }
  deliverUpdate() {
    var re = [];
    var lastRoot = this.getLastRoot();
    var text = this.getTextContent();
    var id = this.getId();

    if (valueHandler.isErraticValue(text)) {
      var valueId = lastRoot.getValueId();
      var valueString = valueHandler.compileValue(text);
      re.push(`
        var ${id} = doms.${id};
        var tmpValue = ${valueString};
        if (last.${valueId} !== tmpValue) {
          last.${valueId} = tmpValue;
          _util.text(${id}, tmpValue);
        }
      `);
    }
    return re;
  }
}

module.exports = TextNode;
