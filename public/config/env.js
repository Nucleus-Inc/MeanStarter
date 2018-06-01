export default {
  development: {
    url_base: 'http://localhost:5000',
    CloudinaryConstant: {
      cloud_name: 'test',
      secure: true,
      upload_preset: 'test_preset'
    },
    offPaths: ['/login','/cadastrar','/recuperar']
  }
}
