'use strict'

var settings = {
  interpolate: /\{\{=([\s\S]+?)\}\}/g,
  encode: /\{\{!([\s\S]+?)\}\}/g,
  conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
  iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
  evaluate: /\{\{([\s\S]+?(\}?)+)\}\}/g,
  use: /\{\{#([\s\S]+?)\}\}/g,
  useParams: /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,
  define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
  defineParams: /^\s*([\w$]+):([\s\S]+)/
}

class DotParser {
  parse (str) {
    var c = settings
    return str.replace(c.interpolate, (m, code) => {
      return `{{${code}}}`
    }).replace(c.encode, (m, code) => {
      return `{{${code}}}`
    }).replace(c.conditional, (m, elsecase, code) => {
      if (elsecase) {
        return code ? `[#elseif ${code}]` : `[#else]`
      } else {
        return code ? `[#if ${code}]` : `[/#if]`
      }
    }).replace(c.iterate, (m, iterate, vname, iname) => {
      if (iterate) {
        return iname ? `[#for ${vname}, ${iname} in ${iterate}]` : `[#for ${vname} in ${iterate}]`
      } else {
        return `[/#for]`
      }
    })
  }
}

export default new DotParser()
