module.exports = function(app){

  var controller = {};

  controller.render = function(req,res){
    res.render('index');
  };

  return controller;

}
