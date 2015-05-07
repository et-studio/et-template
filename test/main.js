require.config({
  paths: {
    // 依赖
    jquery: './bower_components/jquery/dist/jquery',
    underscore: './bower_components/underscore/underscore',
    mocha: './bower_components/mocha/mocha',
    chai: './bower_components/chai/chai',
    bootstrap: './bower_components/bootstrap/dist/js/bootstrap',
    'bootstrap-material-design': './bower_components/bootstrap-material-design',
    // 资源文件夹
    template: './template',
    compilers: './src/compilers',
    spec: './spec',
    // 资源文件
    dom: './src/dom',
    dep: './src/dep'
  }
})


require([
  location.pathname + 'test.js',
  'chai',
  'jquery',
  'mocha',
  'dep',
  'dom',
  'underscore',
  'bootstrap',
  'bootstrap-material-design/dist/js/material',
  'bootstrap-material-design/dist/js/ripples'
], function (test, chai) {
  if(location.pathname !== '/') {
    mocha.setup('bdd');

    window.assert = chai.assert;
    window.expect = chai.expect;
    window.should = chai.should();

    // 注册测试
    test.register();

    // 运行测试
    mocha.run();
  }

})

