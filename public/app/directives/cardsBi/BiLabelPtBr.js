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
      if(string === 'users')
        return 'Usuários'
      if(string === 'example1')
        return 'Exemplo #1'
      if(string === 'example2')
        return 'Exemplo #2'
      if(string === 'example3')
        return 'Exemplo #3'
      return string
    }
  })
})()
