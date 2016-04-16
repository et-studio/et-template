
import {Parser} from 'et-parser'
import {ATTRIBUTES_STATE} from './attributes-state'
import {AttributesResult} from './attributes-result'

const parser = new Parser(`
         | scan         | key        | keyEnd       | valueStart    | value{{ | value         | value'         | value"         | _str
  ------ | ------       | ---        | ------       | ----------    | ------- | -----         | ------         | ------         | ----
  :[\\s] | scan         | keyEnd     | keyEnd       | valueStart    | value{{ | valueEnd:scan | value'         | value"         |
  '      | keyStart:key | key        | keyStart:key | ignore:value' | value{{ | value         | value'End:scan | value"         |
  "      | keyStart:key | key        | keyStart:key | ignore:value" | value{{ | value         | value'         | value"End:scan |
  =      | keyStart:key | valueStart | valueStart   | value         | value{{ | value         | value'         | value"         |
  \\'    | keyStart:key | key        | keyStart:key | value         | value{{ | value         | value'         | value"         |
  \\"    | keyStart:key | key        | keyStart:key | value         | value{{ | value         | value'         | value"         |
  {{     | keyStart:key | key        | keyStart:key | value{{       | value{{ | _str          | _str           | _str           |
  }}     | keyStart:key | key        | keyStart:key | value         | value   | value         | value'         | value"         | _
         | keyStart:key | key        | keyStart:key | value         | value{{ | value         | value'         | value"         |
`)

export function parseAttributes (source: string) {
  let result = new AttributesResult()
  parser.parse(source, (state, token) => {
    switch (state) {
      case 'scan':
      case 'keyEnd':
      case 'ignore':
        break
      case '_str':
      case 'key':
      case 'value{{':
      case 'value':
      case 'value\'':
      case 'value"':
        result.addToken(token)
        break
      case 'keyStart':
        result.createOne()
        result.state = ATTRIBUTES_STATE.Key
        result.addToken(token)
        break
      case 'valueStart':
        result.state = ATTRIBUTES_STATE.Value
        break
      case 'valueEnd':
      case 'value\'End':
      case 'value"End':
        result.state = ATTRIBUTES_STATE.Scan
        break
      default:
        throw new Error(`The state: '${state}' is not defined.`)
    }
  })
  return result.getAttributes()
}
