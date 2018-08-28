(() => {
  angular.module('dashboard').filter('phoneNumber', () => {
    return (str) => {
      if(str.length == 13) {
        const state = '('+str.slice(2,4)+')'
        const initial = str.slice(4,9)
        const finish = str.slice(9,13)
        return state+' '+initial+'-'+finish
      }else if(str.length == 12) {
        const state = '('+str.slice(2,4)+')'
        const initial = str.slice(4,8)
        const finish = str.slice(8,12)
        return state+' '+initial+'-'+finish
      }else if(str.length > 9 && str.length < 12){
        const state = '('+str.slice(0,2)+')'
        let initial = ''
        let finish = ''
        if(str.length == 10){
          initial = str.slice(2,6)
          finish = str.slice(6)
        }else{
          initial = str.slice(2,7)
          finish = str.slice(7)
        }
        return state+' '+initial+'-'+finish
      }
      return str
    }
  })
})()
