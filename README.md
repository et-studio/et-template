# et-template [![NPM version](https://img.shields.io/npm/v/et-template.svg?style=flat-square)](https://www.npmjs.com/package/et-template)

**et-template** 是一个供Web使用的Dom模板，他的设计启发于[doT](https://github.com/olado/doT)。
但是那是一个字符串模板，字符串模板在Web应用中难免会遇见很多问题，比如说Dom的生命周期在每次更新的时候都无法控制，
然而正常的期望在更新模板的时候能够进行差异更新的时候最小程度上的属性变化，这样既能提高性能又能合理控制Dom的生命周期。
所以，**et-template** 设计的初衷就是在模板中控制Dom的生命周期，尽可能的高性能进行差异更新，并且保留模板具备的简单接口容易使用的特性。


## Installation
```console
npm install et-template --save-dev
```


## Usage
[所有模板设计](https://github.com/et-studio/et-template/tree/master/design/et)

[TodoMVC源码](https://github.com/et-studio/et-studio.github.io)

**et-template** 是一个类函数，它被实例化之后的对象拥有编译一个模板代码到运行代码的接口，就像[babel](https://github.com/babel/babel)把es6代码编译成es5代码一样。
通常情况下来说，模板代码都是有部分代码逻辑的html代码，而运行代码则是js可执行代码。

### 基本语法
```html
<div id="insert-example">
  Hello, {{it.name}}!
<div>
<div id="if-example">
  [#if it.isTrue]
    It is true.
  [#else]
    It is else.
  [/#if]
</div>
<div id="for-example">
  [#for item, index in it.list]
    It is for loop {{index}}.
  [/#for]
</div>
```
这里的参数取值参考了doT的设计，能够从it这个外部传入的参数对象中获取传入的任何值。
插入值的标记是装大括号包裹住的部分，中间部分会解释称为运行的取值代码。
if条件判读和for遍历都使用了比较特殊的节点方式，[#]这样的节点进行设计的。
这样设计的原因是把html语法判断使用节点的方式进行包裹，让作用域清晰，易于自定义语法拓展。

### import语法
```html
<div>
  [#import ./models/user, it, it.user]
</div>
```
import 是引用子模板的语法，后面跟着的第一个参数是子模板的引用路径。
从第二个参数起，就是模板在更新的时候会传递进去的参数。
通常情况下，子模板需要传递的参数有且只有it，但是也会具有其它的特别情况。


### html语法(因为重新设计而没有实现)
```html
<div>
  [#html]
    Hello <b>{{it.name}}</b>
  [/#html]
</div>
<div>
  [#html]
    <b>Hello world.</b>
  [/#html]
</div>
```
html 使用时会将内容字符或者变量作为innerHTML赋值给对应的父节点，所以这个语法使用有很多限制:
* 必须拥有父节点。
* 父节点的nodeType必须是1，是一个element对象。
* 没有兄弟节点，意味着父节点只有这一个节点。
* html 子内容会被当作字符串处理，只能做字符串判断，而不能进行复杂的逻辑处理。

### doT模板语法
```html
<div id="insert-example">
  Hello, {{=it.name}}!
<div>
<div id="if-example">
  {{?it.isTrue}}
    It is true.
  {{??}}
    It is else.
  {{?}}
</div>
<div id="for-example">
  {{~it.list:item:index}}
    It is for loop {{index}}.
  {{~}}
</div>
```
doT的语法现在支持了基本的几个语法:
* 插值
* if判断
* for遍历

### 编译模板代码

模板源代码
```js
var ET = require('et-template')
var initOptions = {}
var compileOptions = {}
var et = new ET(initOptions)
var html = '<div>hello, {{it.name}}!</div>'
var result = et.compile(html, compileOptions)
```

编译之后的部分代码
```js
var Template_0 = _createTemplate({
  create: function() {
    var _this = this
    _createElement(_this, null, 2, 'DIV')
    _createText(_this, 2, 4, '')
  },
  update: function(it) {
    var _this = this
    var _last = this.last

    var _tmp = 'Hello, ' + it.name + '!'
    if (_last[0] !== _tmp) {
      _last[0] = _tmp
      _text(_this, 4, _tmp)
    }
  }
})
```
如果你仔细看编译之后的代码，你会发现其实这是相当于进行手动进行了模板的优化。
因为模板函数内部使用的变量全都是 “\_” 开头所以在使用模板时候不应该去定义和使用这样的变量。
在实际项目构建的过程中，应该使用构建工具去将模板文件转换称为运行文件，比如[gulp](https://github.com/gulpjs/gulp)。

这样去使用模板对象
```js
var it = {name: 'Bob'}
var template = new Template_0()
template.update(it)

var $body = document.querySelector('body')
$body.appendChild(template.get())
```
这样的一段代码运行之后，就能看见网页中出现了 “Hello, Bob!” 这样的内容。

## et-template 接口
从依赖库中获取到的是一个类函数，需要实例化之后才能使用编译函数。
在实例化的过程中应该传入一个初始化配置参数，为模板编译的过程中提供一些必要的参数。
如果想要做不同的编译工作，通常需要不同的实例对象。

在编译的时候，仍然需要传递编译时参数，但是编译参数应该是实时使用，而不是初始化参数。
所以编译参数和初始化参数是相互冲突的，同一个参数只会出现在同一个地方。

实例之后的对象具备以下的方法:
* compile(htmlString, compileOptions)
* compileET(htmlString, compileOptions)
* compileDot(htmlString, compileOptions)

如果初始化参数带有 compiledTemplate = 'dot' 这样的参数，那么compile方法会去调用compileDot。
所有编译函数都会返回编辑的结果字符串。

## 模板接口
当模板被实例化之后，就具备了以下的方法函数:
* get 从当前模板获取节点对象

  参数：无

  返回：documentFragment

* update 使用新的数据更新模板

  参数：it

  返回：无

* remove 把模板的节点从页面上移除掉

  参数：无

  返回：无

* destory 整个对象属性销毁，释放内存

  参数：无

  返回：无


## Options
### 初始化参数
|名称|默认值|可选值|解释|
|----|--|---|----|
|compiledTemplate| null | ['dot', null] | 被编译模板使用的兼容语法|
|modules | 'common' | ['common', 'cmd', 'amd', 'global', 'angular'] | 编译结果使用的模块化规范|
|dependencyPath | 'et-dependency' | String | 运行时依赖对象的路劲|
|modelType | 'event' | ['model', 'object', 'event'] | 事件注册类型|

### 编译时参数
|名称|默认值|可选值|解释|
|----|--|---|----|
|moduleId| 'Template' | String | 编辑之后模板对象的模块化id|
|angularModuleName | 'moduleName' | String | angular会使用|

## License
MIT
