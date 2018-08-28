;(() => {
  describe('AccountService: Activation', () => {
    beforeEach(() => {
      module('dashboard')
    })

    let Account, $httpBackend
    /* let user = {
      '_id': 'EFB34556AC34123232434F',
      'name': 'User name',
      'email': 'mean@email.com',
      'phoneNumber': '5585999999999',
      'password': 'M3an@Start3r'
    } */

    beforeEach(inject((_Account_, _$httpBackend_) => {
      Account = _Account_
      $httpBackend = _$httpBackend_
    }))

    it('Service is defined?', () => {
      expect(Account).toBeDefined()
    })

    it('$httpBackend is defined?', () => {
      expect($httpBackend).toBeDefined()
    })

    // it('should have status 200 on activation put request', () => {
    //   $httpBackend.whenRoute('PUT','/users/:id/account/activation').respond((method, url, data, headers, params) => {  })
    //   Account.active(user._id).then((res) => {
    //     expect(res.status).toEqual(201)
    //   }).catch((err) => {
    //     expect(err.status).toEqual(404)
    //   })
    //   $httpBackend.flush()
    // })
  })
})()
