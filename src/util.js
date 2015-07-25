'use strict'

var privateUtil = {
  extendAB (A, B) {
    if (A) {
      for (var key in B) {
        A[key] = B[key]
      }
    }
    return A
  },
  concatAB (arrayA = [], arrayB) {
    if (arrayB && typeof arrayB.forEach === 'function') {
      arrayB.forEach((item) => {
        arrayA.push(item)
      })
    }
    return arrayA
  }
}

class Util {
  each (array, callback) {
    if (!array) {
      return
    }
    for (var i = 0, len = array.length; i < len; i++) {
      if (callback(array[i], i, array) === false) {
        break
      }
    }
  }
  extend (arg1 = {}, ...list) {
    this.each(list, (item) => {
      privateUtil.extendAB(arg1, item)
    })
    return arg1
  }
  concat (array, ...list) {
    this.each(list, (item) => {
      privateUtil.concatAB(array, item)
    })
    return array
  }
  isEmpty (obj) {
    if (!obj) {
      return true
    }
    var keys = Object.keys(obj)
    return keys.length === 0
  }
  contains (array, value) {
    var re = false
    this.each(array, (item) => {
      if (item === value) {
        re = true
        return false
      }
    })
    return re
  }
  clearArraySpace (array) {
    var re = []
    this.each(array, (item) => {
      if (item && typeof item.trim === 'function') {
        item = item.trim()
      }
      if (item) {
        re.push(item)
      }
    })
    return re
  }
  uniq (array) {
    var re = []
    var self = this
    this.each(array, (item) => {
      if (!self.contains(re, item)) {
        re.push(item)
      }
    })
    return re
  }
  omit (objectA, objectB) {
    var re = {}
    for (var key in objectA) {
      if (!(key in objectB)) {
        re[key] = objectA[key]
      }
    }
    return re
  }
  pick (obj, ...list) {
    var re = {}
    this.each(list, (key) => {
      re[key] = obj[key]
    })
    return re
  }
  translateMarks (str) {
    var isEscape = false
    var re = ''
    this.each(str, (token) => {
      if (isEscape) {
        isEscape = false
        re += token
      } else if (token === '\\') {
        isEscape = true
        re += token
      } else if (token === '\'') {
        re += '\\\''
      } else {
        re += token
      }
    })
    return re
  }
}

export default new Util()
