app.factory('storage', function() {
  return {
    set: function(key, obj){
      var string = JSON.stringify(obj)
      localStorage.setItem(key, string);
    },
    get: function(key, callback){
      var data = localStorage.getItem(key);
      var obj = JSON.parse(data);
      return obj;
    },
    clear: function(){
      localStorage.clear();
    }
  }     
});
