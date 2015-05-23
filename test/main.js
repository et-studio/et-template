'use strict';

require.config({
  paths: {
    // 依赖
    jquery: './bower_components/jquery/dist/jquery',
    underscore: './bower_components/underscore/underscore',
    mocha: './bower_components/mocha/mocha',
    chai: './bower_components/chai/chai',
    virtualDom: './bower_components/virtual-dom/dist/virtual-dom',
    bootstrap: './bower_components/bootstrap/dist/js/bootstrap',
    babel: '/babel-core/browser',
    // 资源文件夹
    template: './template',
    compilers: './src/compilers',
    config: './src/config',
    spec: './spec',
    src: './src',
    // 资源文件
    compiler: './src/compiler',
    dom: './src/dom',
    et: './src/et',
    _et: './src/dependency'
  }
});

require([
  location.pathname + 'test.js',
  'chai',
  'jquery',
  'mocha',
  './src/dependency',
  './src/et',
  'underscore',
  // 'bootstrap',
  'babel'
], function (test, chai) {
  var mocha = window.mocha;

  if (location.pathname !== '/') {
    mocha.setup('bdd');

    window.assert = chai.assert;
    window.expect = chai.expect;
    window.should = chai.should();

    if (test.register() !== false) {
      mocha.run();
    }
  }
});
