
import {Parser} from 'et-parser'

const wrapParser = new Parser(`
          | text
  ----    | ----
  '       | single:text
  &break; | break:text
          | text
`)

export function wrap (source: string) {
  let result = ''
  wrapParser.parse(source, (state, token) => {
    switch (state) {
      case 'single':
        result += "\\'"
        break
      case 'break':
        result += '\\n'
        break
      case 'text':
        result += token
        break
      default:
        throw new Error(`parse_value_wrap_${state}`)
    }
  })
  return `'${result}'`
}
