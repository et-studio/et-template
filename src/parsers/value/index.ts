
import {Parser} from 'et-parser'
import {VALUE_STATES} from './value-states'
import {ValueResult} from './value-result'

const SPLIT = '&nbsp;&line;&nbsp;'

const parser = new Parser(`
           | text        | start       | value       | method         | argument       | _str1 | _str2
  ---      | -----       | -------     | ------      | ------         | --------       | ----- | -----
  {{       | start       | start       | cancel:start| method         | argument       |       |
  }}       | text        | end:text    | end:text    | end:text       | end:text       |       |
  ${SPLIT} | text        | error1      | pipe:method | pipe:method    | pipe:method    |       |
  ,        | text        | value       | value       | split:argument | split:argument |       |
  '        | text        | value:_str1 | _str1       | method         | _str1          | _     |
  "        | text        | value:_str2 | _str2       | method         | _str2          |       | _
  \\'      | text        | value       | value       | method         | argument       |       |
  \\"      | text        | value       | value       | method         | argument       |       |
           | text        | value       | value       | method         | argument       |       |
`)

export function parseValue (source: string) {
  let result = new ValueResult()
  let value = ''

  parser.parse(source, (state, token) => {
    switch (state) {
      case '_str1':
      case '_str2':
      case 'text':
      case 'value':
      case 'method':
      case 'argument':
        result.addToken(token)
        break
      case 'start':
        result.state = VALUE_STATES.value
        result.addToken('')
        break
      case 'pipe':
        result.state = VALUE_STATES.pipe
        result.createPipe()
        break
      case 'split':
        result.splitPipe()
        break
      case 'end':
        result.state = VALUE_STATES.text
        break
      case 'cancel':
        result.cancel()
        result.state = VALUE_STATES.value
        break
      default:
        throw new Error(`parse_value_parse_${state}`)
    }
  })

  if (result.state !== VALUE_STATES.text) {
    result.cancel()
  }

  let re: IValueResult = result.format()
  return re
}
