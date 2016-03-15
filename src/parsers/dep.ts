
import {forEachRight, uniq} from 'lodash'
import {Parser} from 'et-parser'

const SYMBOL = '_dep.'

const parser = new Parser(`
            | text         | method      | _str1 | _str2
  -------   | ------       | ------      | ----- | -----
  ${SYMBOL} | start:method | start       |       |
  (         | text         | end:text    |       |
  '         | _str1        | method      | _     |
  "         | _str2        | method      |       | _
  \\\'      | text         | method      |       |
  \\\"      | text         | method      |       |
  :[\\s]    | text         | cancel:text |       |
            | text         | method      |       |
`)

export function parseDep (source: string) {
  let result = ''
  let methods: string[] = []
  let method = '';
  parser.parse(source, function (state, token) {
    switch (state) {
      case '_str1':
      case '_str2':
      case 'text':
        result += token
        break;
      case 'start':
      case 'cancel':
        result += (method + token)
        method = '';
        break;
      case 'method':
        method += token;
        break;
      case 'end':
        result = result.substr(0, result.length - SYMBOL.length)
        result += `_dep_${method}${token}`
        methods.push(method.trim());
        method = '';
        break;
      default:
        throw new Error(`The state: '${state}' is not defined.`)
    }
  })

  forEachRight(uniq(methods), (item) => {
    if (item) {
      result = `var _dep_${item} = _dep.${item};\n` + result
    }
  })
  return result
}

