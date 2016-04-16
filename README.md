# et-template [![NPMversion](https://img.shields.io/npm/v/et-template.svg?style=flat-square)](https://www.npmjs.com/package/et-template) [![Travis](https://travis-ci.org/et-studio/et-template.svg?style=flat-square)](https://travis-ci.org/et-studio/et-template)

**et-template** 是一个供Web使用的Dom模板，他的设计启发于[doT](https://github.com/olado/doT)。
但是那是一个字符串模板，字符串模板在Web应用中难免会遇见很多问题，比如说Dom的生命周期在每次更新的时候都无法控制，
然而正常的期望在更新模板的时候能够进行差异更新的时候最小程度上的属性变化，这样既能提高性能又能合理控制Dom的生命周期。
所以，**et-template** 设计的初衷就是在模板中控制Dom的生命周期，尽可能的高性能进行差异更新，并且保留模板具备的简单接口容易使用的特性。

这是一个编译工具，将html代码转换成一个固定的js结构，然后根据依赖的模板原型函数进行初始化，就像[babel](https://github.com/babel/babel)把es6代码编译成es5代码一样。


## Installation
```console
npm install et-template --save-dev
```


## Usage
[所有模板设计](https://github.com/et-studio/et-template/tree/master/design/et)

[TodoMVC源码](https://github.com/et-studio/et-studio.github.io)

**et-template** 是一个类函数，它需要被实例化，而不同的实例化方式取决于依赖的原型类函数。基本的ET模板类需要制定一个初始化上下文对象。定义模板的时候，进行插值或者事件绑定的时候都需要使用的对象。模板内部默认一个可访问对象，命名为it，指代初始化时传入的上下文对象。

### 基本语法
```html
<div id="insert-example">
  Hello, {{it.name}}!
<div>
<div id="if-example">
  [#if it.isTrue]
    It is true.
  [#elseif it.isElseIf]
    It is else if.
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

插入值的标记是装大括号包裹住的部分，中间部分会解释称为运行的取值代码。

if条件判读和for遍历都使用了比较特殊的节点方式，[#]这样的节点进行设计的。

这样设计的原因是把html语法判断使用节点的方式进行包裹，让作用域清晰，易于自定义语法拓展。


### 事件绑定
```html
<a (click)="it.onClick(it.clickData, $event)">(click)</a>
<a on-click="it.onClick">on-click</a>
```
这里有两种绑定事件的方式，一种是on-前缀，另一种是把事件名用()包裹起来。

事件绑定对应的值可以是一个函数对象，也可以是一个函数执行表达式。函数执行的时候，可以使用'$event'这个关键值传递Dom Event。

注意：

函数执行表达式是通过‘()’来判断的，所以这里不建议使用动态函数，而是使用上下文中的函数。

### 反向输出
```html
<input type="text" [value]="it.name">
<input type="file" [file]="it.file">
```
反向绑定将会在change和input事件的时候触发，读取当前Dom节点的属性，并且赋值给绑定的对象属性。就比如上面的例子，实际的运行代码会是这样的：
```javascript
it.name = this.value
it.file = this.file
```

### 双向绑定
```html
<input [(value)]="it.name">
<input value="{{it.name}}" [value]="it.name">
```
双向绑定其实是一种便捷解释，目前只能使用[(value)]这样的关键值，并且会在编译过程中被解释称为相对应的插值和反向绑定。


### child语法
```html
<div>
  [#child ./models/user, it.userContext]
</div>
```
child 是引用子模板的语法，后面跟着的第一个参数是子模板的引用路径。
从第二个参数是初始化这个模板需要的上下文对象，这里可以是一个求值表达式；也可以不传递指定对象，这时会使用当前对象的上下文进行初始化。

通常情况下来说，child使用的模板的上下文应该在当前模板中始终取到一个固定的对象，而不应该是动态的。


### html语法
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
* 没有兄弟节点，意味着父节点只有这一个子节点。
* html 子内容会被当作字符串处理，只能做字符串判断，而不能进行复杂的逻辑处理。


### 编译模板代码

模板源代码
```js
var et = require('et-template')
var options = {}
var html = '<div>hello, {{it.name}}!</div>'
var result = et.compile(html, options)
```

编译之后的部分代码
```js
var Template_0 = _createTemplate({
  create: function() {
    var _this = this
    var it = _this.context

    _createElement(_this, null, 2, 'DIV')
    _createText(_this, 2, 4, '')
  },
  update: function(it) {
    var _this = this
    var _last = _this.last
    var it = _this.context

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
var template = new Template_0(it)
template.update()

var $body = document.querySelector('body')
$body.appendChild(template.get())
```
这样的一段代码运行之后，就能看见网页中出现了 “Hello, Bob!” 这样的内容。


## 模板接口
当模板被实例化之后，就具备了以下的方法函数:
* get 从当前模板获取节点对象
* update 使用新的数据更新模板
* remove 把模板的节点从页面上移除掉
* destory 整个对象属性销毁，释放内存


## et.compile(options)
### modules

编译结果的运行格式

可选参数: 'common', 'cmd', 'amd', 'global', 'angular'

默认值: 'common'


### depPath

编译结果的依赖对象的引用地址

默认值: 'et-dependency'


### moduleId

在 amd, global, angular 的模式下需要显示指定每个结果函数的地址命名

默认值: 'Tempalte'



## License
MIT
