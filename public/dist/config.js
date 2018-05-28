angular.module("dashboard", [])

.constant("url_base", "http://localhost:5000")

.constant("CloudinaryConstant", {
	"cloud_name": "eduhcastro",
	"secure": true,
	"upload_preset": "educastro_preset"
})

.constant("offPaths", [
	"/login",
	"/cadastrar",
	"/recuperar"
])

;