import {Parser} from 'et-parser'

const parser = new Parser(`
                       | ignore | item              | indexPre          | index             | indexEnd          | expression     | trackBy | _str1 | _str2
  -------------------- | ------ | --------          | --------          | --------          | --------          | ----------     | ------- | ----- | -----
  :[\\s]               | ignore | indexPre          | indexPre          | indexEnd          | indexEnd          | expression     | trackBy |       |
  :[,;]                | error1 | indexPre          | indexPre          | index             | error2            | expression     | trackBy |       |
  &nbsp;in&nbsp;       | :::    | ignore:expression | ignore:expression | ignore:expression | ignore:expression | expression     | trackBy |       |
  &nbsp;track by&nbsp; | :::    | :::               | :::               | :::               | error2            | ignore:trackBy | trackBy |       |
  '                    | item   | item              | index             | index             | error2            | _str1          | trackBy | _     |
  "                    | item   | item              | index             | index             | error2            | _str2          | trackBy |       | _
  \\'                  | item   | item              | index             | index             | error2            | expression     | trackBy |       |
  \\"                  | item   | item              | index             | index             | error2            | expression     | trackBy |       |
                       | item   | item              | index             | index             | error2            | expression     | trackBy |       |
`)

export function parseFor (source: string) {
  let item = '';
  let index = '';
  let expression = '';
  let trackBy = '';

  parser.parse(source, (state, token) => {
    switch (state) {
      case 'ignore':
      case 'indexPre':
      case 'indexEnd':
        break;
      case 'item':
        item += token;
        break;
      case 'index':
        index += token;
        break;
      case '_str1':
      case '_str2':
      case 'expression':
        expression += token;
        break;
      case 'trackBy':
        trackBy += token;
        break;
      default:
        throw new Error(`parse_for_${state}`)
    }
  })

  if (!index) index = '_index';
  return {item, index, expression, trackBy}
}
