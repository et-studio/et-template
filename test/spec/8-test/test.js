// @ignore

var LOOP_TIME = 1 * Math.pow(10, 8)

function testtest3 () {
  var NUMBER = 0
  NUMBER++
}

function testtest2 () {
  testtest3()
}

function testtest1 () {
  testtest2()
}

function test1 () {
  for (var i = 0; i < LOOP_TIME; i++) {
    testtest1()
  }
}

function test2 () {
  for (var i = 0; i < LOOP_TIME; i++) {
    testtest3()
  }
}

function test3 () {
  for (var i = 0; i < LOOP_TIME; i++) {
    var NUMBER = 0
    NUMBER++
  }
}

var util = {
  testtest3: function () {
    var NUMBER = 0
    NUMBER++
  },
  testtest2: function () {
    this.testtest3()
  },
  testtest1: function () {
    this.testtest2()
  },
  test1: function () {
    for (var i = 0; i < LOOP_TIME; i++) {
      this.testtest1(this)
    }
  },
  test2: function () {
    for (var i = 0; i < LOOP_TIME; i++) {
      this.testtest3()
    }
  },
  test3: function () {
    for (var i = 0; i < LOOP_TIME; i++) {
      testtest3.call(this)
    }
  }
}

console.time('util.test1')
util.test1()
console.timeEnd('util.test1')

console.time('util.test2')
util.test2()
console.timeEnd('util.test2')

console.time('util.test3')
util.test3()
console.timeEnd('util.test3')

console.time('test1')
test1()
console.timeEnd('test1')

console.time('test2')
test2()
console.timeEnd('test2')

console.time('test3')
test3()
console.timeEnd('test3')
