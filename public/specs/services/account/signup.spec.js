(() => {
  describe('AccountService: Signup', () => {
    beforeEach(() => {
      module('dashboard')
    })

    let Account, $httpBackend
    let user = {
      '_id': 'EFB34556AC34123232434F',
      'name': 'User name',
      'email': 'mean@email.com',
      'phoneNumber': '5585999999999',
      'password': 'M3an@Start3r'
    }

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

    it('should have status 200 on signup post request', () => {
      $httpBackend.expectGET("app/views/auth/login.html").respond([])
      $httpBackend.whenPOST('http://localhost:5000/users/account/signup').respond((method, url, data) => {
        return [201, {
          _id: user._id,
          account: {
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            isActive: false
          }
        }]
      })
      Account.signup(user.name,user.email,user.phoneNumber,user.password).then((res) => {
        expect(res.status).toEqual(201)
      })
      $httpBackend.flush()
    })

    it('should have isActive false on signup post request', () => {
      $httpBackend.expectGET("app/views/auth/login.html").respond([])
      $httpBackend.whenPOST('http://localhost:5000/users/account/signup').respond((method, url, data) => {
        return [201, {
          _id: user._id,
          account: {
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            isActive: false
          }
        }]
      })
      Account.signup(user.name,user.email,user.phoneNumber,user.password).then((res) => {
        expect(res.data.account.isActive).toBeFalsy()
      })
      $httpBackend.flush()
    })

    it('should have all account properties on signup post response', () => {
      $httpBackend.expectGET("app/views/auth/login.html").respond([])
      $httpBackend.whenPOST('http://localhost:5000/users/account/signup').respond((method, url, data) => {
        return [201, {
          _id: user._id,
          account: {
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            isActive: false
          }
        }]
      })
      Account.signup(user.name,user.email,user.phoneNumber,user.password).then((res) => {
        expect(res.data.account).toHaveMember('name')
        expect(res.data.account).toHaveMember('email')
        expect(res.data.account).toHaveMember('phoneNumber')
        expect(res.data.account).toHaveMember('isActive')
      })
      $httpBackend.flush()
    })

    it('should fail to add a user with invalid fields', () => {
      $httpBackend.expectGET("app/views/auth/login.html").respond([])
      $httpBackend.whenPOST('http://localhost:5000/users/account/signup').respond((method, url, data) => {
        return [400, {
          code: 4000,
          errors: [{
            email: {
              location: "body",
              param: "email",
              value: "email@",
              msg: "Invalid value"
            }
          }]
        }]
      })
      Account.signup(user.name,'email@',user.phoneNumber,user.password).then((res) => {}).catch((err)=>{
        expect(err.status).toEqual(400)
      })
      $httpBackend.flush()
    })

  })
})()
