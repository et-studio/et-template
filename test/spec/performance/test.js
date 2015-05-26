var Dom = require('dom');
var Template = require('template/test1');

exports.register = function(){

  var times = 40000;
  describe('Compare perfomence of ' + times + ' times.', function(){

    it('et', function(done){
      var content = document.getElementById('test1');
      var t = new Template();
      content.appendChild(t.get());
      for(var i = 0 ; i < times ; i++){
        t.update({isTrue: i % 2});
      }
      done();
    });

    it('et (init in loop)', function(done){
      var content = document.getElementById('test2');
      for(var i = 0 ; i < times ; i++){
        var t = new Template();
        content.innerHTML = "";
        content.appendChild(t.get());
        t.update({isTrue: i % 2})
      }
      done();
    });

    it('string', function(done){
      var content = document.getElementById('test3');
      for(var i = 0 ; i < times ; i++){
        var str = '<div>It is before.</div>';
        if(i%2){
          str += '<div>It is true.</div>';
        }
        str += '<div>It is after.</div>';
        content.innerHTML = str;
      }
      done();
    });

  });

}
