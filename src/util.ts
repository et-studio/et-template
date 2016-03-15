
import {each} from 'lodash'
import {wrap} from './parsers'

const TRANSLATES = [
  ['&quot;', '"'],
  ['&lt;', '<'],
  ['&gt;', '>'],
  ['&nbsp;', ' '],
  ['&amp;', '&']
]

export function unescape (source: string) {
  for (let i = 0, len = TRANSLATES.length; i < len; i++) {
    let arr = TRANSLATES[i]
    let key = arr[0]
    let value = arr[1]
    source = source.replace(new RegExp(key, 'g'), value)
  }
  return source
}

export function eachNode <T extends IOriginNode>(node: T, iterator: (node: T) => boolean | void) {
  let result = iterator(node)

  if (node.children.length) {
    eachNode(node.children[0], iterator)
  }

  if (node.next) {
    eachNode(node.next, iterator)
  }
}


export function removeAt <T>(array: T[], item: T) {
  let index = array.indexOf(item) + 1
  if (!index) return array // 没有找到这个元素

  let len = array.length
  for (; index < len; index++) {
    // 从当前位置，所有后面的节点前移一个位置
    array[index - 1] = array[index]
  }
  array.pop() // 去掉最后一个位置
  return array
}

export function insertAfter <T>(array: T[], item: T, newItem: T) {
  let index = array.indexOf(item) + 1
  if (!index) return array // 没有找到这个元素

  let len = array.length
  for (let i = len; i > index; i--) {
    // 从当前位置，所有后面的节点后移一个位置
    array[i] = array[i - 1]
  }
  array[index] = newItem // 占位
  return array
}

export function insertBefore <T>(array: T[], item: T, newItem: T) {
  let index = array.indexOf(item)
  if (index < 0) return array // 没有找到这个元素

  let len = array.length
  for (let i = len; i > index; i--) {
    // 从当前位置，所有后面的节点后移一个位置
    array[i] = array[i - 1]
  }
  array[index] = newItem // 占位
  return array
}

export function addMapToMap <T, U>(mapA: Map<T, U>, mapB: Map<T, U>) {
  mapB.forEach((value, key) => {
    mapA.set(key, value)
  })
  return mapA
}

export function mapToJSON<T> (map: Map<string, T>) {
  if (!map) return '{}'

  let obj = {}
  map.forEach((value, key) => {
    obj[key] = value
  })
  return JSON.stringify(obj)
}

export function protectExpression (expression: string) {
  if (!expression) {
    return  "''"
  } else if (~expression.indexOf('+') || ~expression.indexOf('?')) {
    return `(${expression})`
  } else {
    return expression
  }
}

export function fillTo<T> (arr: T[], length: number, value: T) {
  let start = arr.length
  let end = length
  while (start < end) {
    arr[start++] = value
  }
  return arr
}
