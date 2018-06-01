(() => {
  angular.module('dashboard').factory('Socket', ['$rootScope', function($rootScope) {
    const socket = io.connect()
    return {
      on: (eventName, callback) => {
        socket.on(eventName, () => {
          const args = arguments
          $rootScope.$apply( () => {
            callback.apply(socket, args)
          })
        })
      },
      emit: (eventName, data, callback) => {
        socket.emit(eventName, data, () => {
          const args = arguments
          $rootScope.$apply( () => {
            if (callback) {
              callback.apply(socket, args)
            }
          })
        })
      }
    }
  }])
})()
