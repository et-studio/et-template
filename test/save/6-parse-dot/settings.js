module.exports = [
  {
    title: 'dot if',
    dot: `
      {{?it.isIf}}
        It is true.
      {{??it.isElseif}}
        It is elseif.
      {{??}}
        It is else.
      {{?}}
    `,
    expect: `
    [#if it.isIf]
      It is true.
    [#elseif it.isElseif]
      It is elseif.
    [#else]
      It is else.
    [/#if]
    `
  },
  {
    title: 'dot for',
    dot: `
      {{~it.list:item:index}}
        It is {{=item.name}}:{{=index}}
      {{~}}
    `,
    expect: `
      [#for item, index in it.list]
        It is {{item.name}}:{{index}}
      [/#for]
    `
  }
]
