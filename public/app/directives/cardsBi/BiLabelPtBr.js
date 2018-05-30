(() => {
  angular.module('dashboard').filter('biLabel', () => {
    return (string) => {
      if(string === 'admins')
        return 'Operadores'
      if(string === 'customers')
        return 'Clientes'
      if(string === 'partners')
        return 'Parceiros'
      if(string === 'services')
        return 'Serviços'
      if(string === 'categories')
        return 'Categorias'
      if(string === 'plans')
        return 'Planos'
      if(string === 'offers')
        return 'Ofertas'
      if(string === 'clients')
        return 'Clientes'
      if(string === 'sales')
        return 'Vendas'
      return string
    }
  })
})()
