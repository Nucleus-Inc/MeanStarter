(() => {
  angular.module('dashboard').filter('commonNames', () => {
    return (string) => {
      if(!angular.isString(string))
        return string
      return string.replace(/(?:^|\s)\S/g,(a) => { return a.toUpperCase() })
    }
  })
})()
