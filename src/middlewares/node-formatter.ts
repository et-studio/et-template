

const LINE_SPLIT = '\n'

export function format (last: string) {
  removeComments('')
  return last
}
function removeComments (content: string) {
  let list = content.split(LINE_SPLIT)
  let results = []
  for (let i = 0, len = list.length; i < len; i++) {
    let item = list[i].trim()
    if (item.indexOf('//') !== 0) results.push(item)
  }
  return results.join(LINE_SPLIT)
}
