require.config({
  paths: {
    // 依赖
    jquery: './bower_components/jquery/dist/jquery',
    underscore: './bower_components/underscore/underscore',
    mocha: './bower_components/mocha/mocha',
    chai: './bower_components/chai/chai',
    // 资源文件夹
    template: './src/template',
    compilers: './src/compilers',
    test: './test',
    // 资源文件
    dom: './src/dom',
    dep: './src/dep'
  }
})

require([
  'test/index',
  'chai',
  'mocha',
  'dep',
  'dom',
  'jquery',
  'underscore'
], function (testIndex, chai) {
  mocha.setup('bdd');

  window.assert = chai.assert;
  window.expect = chai.expect;
  window.should = chai.should();

  // 注册测试
  testIndex.register();

  // 运行测试
  mocha.run();
})

