(() => {
  angular.module('dashboard').factory('Notify', ['notify', (notify) => {

    let position = 'center'
    let duration = '3000'
    let template = ''

    return {
      set: (pos, dur, tem, callback) => {
        position = pos
        duration = dur
        template = tem
        return callback( ( position != undefined && duration != undefined && template != undefined ) ? true : false )
      },
      get: (callback) => {
        return callback({
          'position': position,
          'duratiom': duration,
          'template': template
        })
      },
      run: (msg, cls, pos, dur, tem, callback) => {
        if(msg == undefined || cls == undefined)
          return callback(false)
        else{
          notify({
            'message': msg,
            'classes': cls,
            'templateUrl': tem != undefined ? tem : template,
            'position': pos != undefined ? pos : position,
            'duration': dur != undefined ? dur : duration
          })
          return callback(true)
        }
      }
    }

  }])
})()
