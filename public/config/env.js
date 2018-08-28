export default {
  development: {
    CloudinaryConstant: {
      url_base: 'https://api.cloudinary.com/v1_1/',
      cloud_name: 'test',
      secure: true,
      upload_preset: 'test_preset'
    },
    offPaths: ['/login','/cadastrar','/recuperar']
  }
}
