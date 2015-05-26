// @ignore
var App = Ember.Application.create({
  rootElement: '#app'
});

App.Router.map(function() {
  this.resource('dbmon', { path: '/' });
});

App.Database = Ember.Object.extend({
  dbs: [],
  refreshData: function(){
    this.set('dbs', getDatabases());
    var _this = this;
    setTimeout(function(){ _this.refreshData() }, TIMEOUT);
  }
});

App.DbmonRoute = Ember.Route.extend({
  model: function() {
    var db = App.Database.create();
    db.refreshData()
    return db;
  }
});
