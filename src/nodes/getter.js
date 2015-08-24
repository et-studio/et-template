'use strict'

var config = {
  'templateFunctionPrefix': 'Template_'
}

class Getter {
  constructor () {
    this.valueId = 0
  }
  getId () {
    if (this._index >= 0) {
      return this._index * 2
    } else {
      return null
    }
  }
  getLineNumber () {
    return this._lineNumber
  }
  getTemplateName () {
    var id = this.getId()
    return config.templateFunctionPrefix + id
  }
  getLineId () {
    var id = this.getId()
    return id - 1
  }
  getValueId () {
    return this.valueId++
  }
  getParentId () {
    return this.parent && this.parent.getId()
  }
  getNodeName () {
    return this.nodeName && this.nodeName.toUpperCase()
  }
  getTextContent () {
    return this.textContent || this.content || ''
  }
  getRootValueId () {
    var lastRoot = this.getLastRoot()
    if (lastRoot) {
      return lastRoot.getValueId()
    } else {
      return null
    }
  }
  getLastRoot () {
    var parent = this.parent
    while (parent) {
      if (parent.isNewTemplate || !parent.parent) {
        return parent
      }
      parent = parent.parent
    }
    return null
  }
}

export default Getter
