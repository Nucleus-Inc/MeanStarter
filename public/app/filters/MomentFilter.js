(() => {
  angular.module('dashboard').filter('momentFilter', ['moment',(moment) => {
    return (count, action, data) => {
      return moment(data).add(count,'days').format('DD/MM/YYYY')
    }
  }])
})()
