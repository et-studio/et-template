module.exports = [
  {
    title: 'aaa{{it.id}}bbb{{it.getSrc()}}',
    source: 'aaa{{it.id}}bbb{{it.getSrc()}}',
    expect: `'aaa' + (it.id) + 'bbb' + (it.getSrc())`
  },
  {
    title: 'It is [#if it.isTrue]true[#else]false[/#if]!!!',
    source: 'It is [#if it.isTrue]true[#elseif it.isElse]else[#else]false[/#if]!!!',
    expect: `'It is ' + (function () {
      if (it.isTrue) {
        return 'true'
      } else if (it.isElse) {
        return 'else'
      } else {
        return 'false'
      }
      return ''
    })() + '!!!'`
  }
]
