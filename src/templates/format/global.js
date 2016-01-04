
// {{
;(function(global){
  var module = {};
  var exports = {};
  function require (key) {
    return global[key]
  }

  ${it.content}
  global.${it.moduleId} = module.exports;
})(window)
// }}
