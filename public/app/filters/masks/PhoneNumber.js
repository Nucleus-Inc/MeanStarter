(() => {
  angular.module('dashboard').filter('phoneNumber', () => {
    return (str) => {
      const state = '('+str.slice(2,4)+')'
      const initial = str.slice(4,9)
      const finish = str.slice(9,13)
      return state+' '+initial+'-'+finish
    }
  })
})()
