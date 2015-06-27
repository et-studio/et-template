'use strict'

var fs = require('fs')
var through = require('through2')
var rootDir = process.cwd()

var mark = {
  start: '// @tableStart:',
  end: '// @tableEnd'
}
var cache = {}

var tableHandler = {
  checkTableMark (str) {
    var startIndex = str.indexOf(mark.start)
    var endIndex = str.indexOf(mark.end)
    return endIndex > startIndex
  },
  checkStart (str) {
    return str.indexOf(mark.start) >= 0
  },
  checkEnd (str) {
    return str.indexOf(mark.end) >= 0
  },
  translateStates (matrix) {
    var re = []
    matrix.forEach(function (list, i) {
      var state = list[0]
      if (state) {
        re.push(`'${state}'`)
      }
    })
    return re
  },
  translateSymbols (matrix) {
    var re = []
    var list = matrix[0]
    list.forEach(function (symbol, i) {
      if (symbol) {
        re.push(symbol)
      }
    })
    return re
  },
  translateTable (matrix) {
    var re = []
    var symbols = this.translateSymbols(matrix)
    var symbolList = matrix[0]

    matrix.forEach(function (list, i) {
      if (i >= 1) {
        var tmpRe = []
        list.forEach(function (tmp, j) {
          if (j >= 1) {
            var symbol = symbolList[j]
            var symbolIndex = symbols.indexOf(symbol)
            tmpRe.push(`'${symbolIndex}': '${tmp}'`)
          }
        })
        re.push(`{${tmpRe.join(', ')}}`)
      }
    })

    return `[
      ${re.join(',\n')}
    ]`
  },
  translateTableMatrix (contents) {
    var contentsList = contents.trim().split('\n')
    var matrix = []
    var len = 0
    contentsList.forEach(function (line, i) {
      if (i !== 1) {
        var lineList = line.split('|')
        if (i === 0) {
          len = lineList.length
        } else {
          while (lineList.length < len) {
            lineList.push('')
          }
        }
        lineList.forEach(function (tmp, j) {
          if (tmp) {
            tmp = tmp.trim()
          }
          var colList = matrix[j] || []
          colList[i] = tmp
          matrix[j] = colList
        })

      }
    })
    return matrix
  },
  translate (name, contents) {
    var matrix = this.translateTableMatrix(contents)
    var states = this.translateStates(matrix)
    var symbols = this.translateSymbols(matrix)
    var table = this.translateTable(matrix)
    var re = `
    var ${name}TableOptions = {
      states: [${states.join(', ')}],
      symbols: [${symbols.join(', ')}],
      table: ${table}
    }
    `
    return re.trim()
  },
  getTable (str) {
    var markIndex = str.indexOf(mark.start)
    var name = str.substr(markIndex + mark.start.length).trim()
    if (cache[name]) {
      return cache[name]
    }

    var path = `${rootDir}/src/tables/${name}.table`
    var fileContents = ''
    try {
      fileContents = fs.readFileSync(path, 'utf-8')
    } catch(err) {
      console.log(`file not found: ${path}`)
    }

    if (fileContents) {
      var re = this.translate(name, fileContents)
      cache[name] = re
      return re
    } else {
      return ''
    }
  },
  replace (str) {
    var re = []
    var list = str.split('\n')

    var isTabling = false
    for (var i = 0, len = list.length; i < len; i++) {
      var tmp = list[i]

      if (this.checkStart(tmp)) {
        isTabling = true
        re.push(tmp)
        var table = this.getTable(tmp)
        if (table) {
          re.push(table)
        }
      } else if (this.checkEnd(tmp)) {
        isTabling = false
      }

      if (!isTabling) {
        re.push(tmp)
      }
    }
    return re.join('\n')
  }
}

module.exports = function () {
  return through.obj(function (file, enc, next) {
    if (!file.isBuffer()) {
      return next()
    }
    var contents = file.contents.toString()
    if (tableHandler.checkTableMark(contents)) {
      contents = tableHandler.replace(contents)
      file.contents = new Buffer(contents)
    }
    this.push(file)
    next()
  })
}
