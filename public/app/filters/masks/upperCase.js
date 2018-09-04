(() => {
  angular.module('dashboard').filter('upperCase', () => {
    return (string) => {
      if(!angular.isString(string))
        return string
      return string.toUpperCase()
    }
  })
})()
