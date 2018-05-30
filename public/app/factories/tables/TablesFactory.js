(() => {
  angular.module('dashboard').factory('Tables', ['$filter', ($filter) => {

    return {
      search: (args, key, callback) => {

        let i = 0
        let item = args[i]
        let k = key

        if(k != undefined)
          k = k.toLowerCase()

        let s = item.search(k)

        do{
          let item = args[i]
          if(item != undefined && typeof item != "boolean"){
            item = args[i].toLowerCase()
            s = item.search(k)
          }
          i++
        }while(s < 0 && i < args.length)

        return callback( s > -1 ? true : false )

      },
      update: (buffer, args, key, conditions, callback) => {

        buffer.filter((item) => {

          let i = 0
          let arg = args[i].label.toLowerCase()
          let k = key

          if(k != undefined)
            k = k.toLowerCase()

          do{
            arg = args[i].label.toLowerCase()
            i++
          }while(arg.search(k) < 0 && i < args.length)

          let value = args[i==0 ? 0 : i-1].value

          return callback( value != null ? ( item[conditions] == value ? item : null ) : item )

        })

      },
      condition: (buffer, key, callback) => {

        let i=0
        let item = buffer[i]

        do{
          item = buffer[i]
          i++
        }while(i < buffer.length && item.label != key)

        return callback( (item._id == 1 || item._id == 2 || item._id == 0) ? 'isActive' : 'status' )

      },
      clean: (scope, args, callback) => {

        scope.key = ''
        scope.selectedPredicate = scope.predicates[0].label
        scope.filteredList = args

        return callback(true)

      }
    }

  }])
})()
