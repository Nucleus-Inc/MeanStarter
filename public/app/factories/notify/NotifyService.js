(function() {
  angular.module('dashboard').factory('Notify', ['notify',function(notify) {

    var position = 'center';
    var duration = '3000';
    var template = '';

    return {
      set: function(pos, dur, tem, callback){
        position = pos;
        duration = dur;
        template = tem;
        return callback( ( position != undefined && duration != undefined && template != undefined ) ? true : false );
      },
      get: function(callback){
        return callback({
          'position': position,
          'duratiom': duration,
          'template': template
        });
      },
      run: function(msg, cls, pos, dur, tem, callback){
        if(msg == undefined || cls == undefined)
          return callback(false);
        else{
          notify({
            'message': msg,
            'classes': cls,
            'templateUrl': tem != undefined ? tem : template,
            'position': pos != undefined ? pos : position,
            'duration': dur != undefined ? dur : duration
          });
          return callback(true);
        }
      }
    };

  }]);
}());
