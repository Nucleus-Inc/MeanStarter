(() => {
  angular.module('dashboard').filter('unique', () => {
    return (items, filter) => {
      if(filter === false)
        return items
      if((filter || angular.isUndefined(filter)) && angular.isArray(items)){
        let newItems = []
        const extractValueToCompare = (item) => {
          return angular.isObject(item) && angular.isString(filter) ? item[filter] : item
        }
        angular.forEach(items, (item) => {
          let i = 0
          while(i < newItems.length && !angular.equals(extractValueToCompare(newItems[i]),extractValueToCompare(item)))
            i++
          if(i == newItems.length)
            newItems.push(item)
        })
        items = newItems
      }
      return items
    }
  })
})()
