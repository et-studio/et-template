// ignore
require.config({
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    underscore: '../bower_components/underscore/underscore',
    dom: './dom',
    template: './html/expect',
    dep: './dep'
  }
})

require([
  'dep',
  'dom',
  'template',
  'jquery'
], function () {

})

