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
  stringify (obj) {
    return JSON.stringify(obj).replace(/\"/g, "'")
  }
}

module.exports = new Util()
