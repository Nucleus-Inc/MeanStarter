(function(angular, undefined) {
  angular.module("dashboard")

.constant("url_base", "http://localhost:5000")

.constant("CloudinaryConstant", {
	"cloud_name": "test",
	"secure": true,
	"upload_preset": "test_preset"
})

.constant("offPaths", [
	"/login",
	"/cadastrar",
	"/recuperar"
])

;
})(angular);