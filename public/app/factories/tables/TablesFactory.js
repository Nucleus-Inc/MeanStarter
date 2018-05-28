(function() {
  angular.module('dashboard').factory('Tables', ['$filter',function($filter) {

    return {
      search: function(args, key, callback){

        var i = 0;
        var item = args[i];
        var k = key;

        if(k != undefined)
          k = k.toLowerCase();

        var s = item.search(k);

        do{
          var item = args[i];
          if(item != undefined && typeof item != "boolean"){
            item = args[i].toLowerCase();
            s = item.search(k);
          }
          i++;
        }while(s < 0 && i < args.length);

        return callback( s > -1 ? true : false );

      },
      update: function(buffer, args, key, conditions, callback){

        buffer.filter(function(item){

          var i = 0;
          var arg = args[i].label.toLowerCase();
          var k = key;

          if(k != undefined)
            k = k.toLowerCase();

          do{
            arg = args[i].label.toLowerCase();
            i++;
          }while(arg.search(k) < 0 && i < args.length);

          var value = args[i==0 ? 0 : i-1].value;

          return callback( value != null ? ( item[conditions] == value ? item : null ) : item );

        });

      },
      condition: function(buffer, key, callback){

        var i=0;
        var item = buffer[i];

        do{
          item = buffer[i];
          i++;
        }while(i < buffer.length && item.label != key);

        return callback( (item._id == 1 || item._id == 2 || item._id == 0) ? 'isActive' : 'status' );

      },
      clean: function(scope, args, callback){

        scope.key = '';
        scope.selectedPredicate = scope.predicates[0].label;
        scope.filteredList = args;

        return callback(true);

      }
    };

  }]);
}());
