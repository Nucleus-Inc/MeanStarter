(() => {
  angular.module('dashboard').filter('subscription', () => {
    return (string) => {
      if(string == 'premium')
        return 'Premium'
      return "Gratuito"
    }
  })
})()
