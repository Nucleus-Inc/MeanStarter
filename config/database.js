var mongoose = require('mongoose');
var bluebird = require('bluebird');

module.exports = function(uri) {

  bluebird.promisifyAll(mongoose);

  //mongoose.Promise = global.Promise; For use native promise
  mongoose.Promise = bluebird;

  mongoose.connect(uri);

  mongoose.connection.on('connected',function(){
    console.log('Mongoose! Connected in: '+uri);
  });

  mongoose.connection.on('disconnected',function(){
    console.log('Mongoose! Disconnected: '+uri);
  });

  mongoose.connection.on('error',function(erro){
    console.log('Mongoose! Error in connection: '+erro);
  });

  process.on('SIGINT',function(){
    mongoose.connection.close(function(){
      console.log('Mongoose! Disconnected for finished app');
    });
    process.exit(0);
  });

}
