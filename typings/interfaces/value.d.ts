
interface IValueResult {
  isDynamic: boolean
  hasPipe: boolean
  values: (string | {expression: string, pipes: string[][]})[]
}
