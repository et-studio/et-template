'use strict'
// @ignore

require.config({
  paths: {
    // 依赖
    jquery: './bower_components/jquery/dist/jquery',
    underscore: './bower_components/underscore/underscore',
    mocha: './bower_components/mocha/mocha',
    chai: './bower_components/chai/chai',
    bootstrap: './bower_components/bootstrap/dist/js/bootstrap',
    babel: '/node_modules/babel-core/browser',
    // 资源文件夹
    template: './template',
    spec: './spec',
    src: './src',
    _et: './src/dependency',
    design: './design'
  }
})

require([
  window.location.pathname + 'test.js',
  'chai',
  'jquery',
  'mocha',
  '_et',
  'underscore',
  'babel'
], function (test, chai) {
  var mocha = window.mocha

  if (window.location.pathname !== '/') {
    mocha.setup('bdd')

    window.assert = chai.assert
    window.expect = chai.expect
    window.should = chai.should()

    if (test.register() !== false) {
      mocha.run()
    }
  }
})
