(() => {
  angular.module('dashboard').controller('CloudinaryCtrl', ['$scope', function($scope) {

    let vm = this
    vm.zoomImg = "https://dummyimage.com/1024x16:9/"

    vm.slickConfig = {
      lazyLoad: 'ondemand',
      infinite: true,
      speed: 500,
      draggable: true,
      autoplay: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: true
    }

    vm.zoom = (url) => {
      let top = angular.element('.modal').scrollTop()
      angular.element('#slick-cloudinary-modal').css({
        'top': top + 'px'
      })
      angular.element('#slick-cloudinary-modal').addClass('active')
      angular.element('.modal').addClass('overflow-h')
      angular.element('#slick-figure-img').attr("src", url.path.replace('/w_340,h_192,c_pad,b_rgb:15b0c7','/w_1024,h_576,c_pad,b_rgb:15b0c7'))
      angular.element('#slick-figure-title').text(url.title)
      angular.element('#slick-figure-desc').text(url.description)
      if(url.title==null)
        angular.element('#slick-infobox').css("display","none")
      else
        angular.element('#slick-infobox').css("display","block")
    }

    vm.close = () => {
      angular.element('#slick-cloudinary-modal').removeClass('active')
      angular.element('.modal').removeClass('overflow-h')
    }

    $scope.setUrl = (url) => {
      if(url){
        let search = url.search('/w_340,h_192,c_pad,b_rgb:15b0c7')
        if(search > -1){
          return (url)
        }else{
          let pos = url.lastIndexOf("/upload/")
          let res = url.slice(0, pos+8)
          let posRes = url.slice(pos+7,url.length)
          res = res+'w_340,h_192,c_pad,b_rgb:15b0c7'
          return (res+posRes)
        }
      }else
        return ("https://dummyimage.com/340x16:9/")
    }

    $scope.show = (urls) => {
      vm.urls = urls
    }

  }])
})()
