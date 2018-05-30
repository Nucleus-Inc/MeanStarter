(() => {
  angular.module('dashboard').filter('status', () => {
    return (string) => {
      if(string == true)
        return 'Ativo'
      if(string == false)
        return 'Inativo'
      if(string === 'new')
        return 'Novo'
      if(string === 'rejected')
        return 'Rejeitado'
      if(string === 'approved' || string === 'approv')
        return 'Aprovado'
      if(string === 'reproved' || string === 'reprov')
        return 'Reprovado'
      if(string === 'banned')
        return 'Banido'
      return 'Pendente'
    }
  })
})()
