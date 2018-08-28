(() => {
  angular.module('dashboard').factory('ArrayFactory', [() => {

    return {
      indexOf: (array, field, item) => {
        let i = 0
        while(i < array.length && array[i][field] != item)
          i++
        return i < array.length ? i : -1
      },
      isEquals: (object, other) => {
        let objectKeys = Object.keys(object)
        let otherKeys = Object.keys(other)
        if(objectKeys.length == otherKeys.length){
          let i = 0
          while(i < objectKeys.length && objectKeys[i] == otherKeys[i])
            i++
          if(i >= objectKeys.length ){
            let j = 0
            let propertyName = objectKeys[j]
            while(j < objectKeys.length && (object[propertyName] == other[propertyName]))
              j++
            if(j >= objectKeys.length)
              return true
            return false
          }
          return false
        }
        return false
      },
      map: (array, condition, item, field) => {
        const index = []
        const data = []
        for(let i=0; i<array.length; i++){
          if(array[i] == condition)
            index.push(i)
        }
        for(let i=0; i<index.length; i++){
          data.push(item[i][field])
        }
        return data
      }
    }

  }])
})()
