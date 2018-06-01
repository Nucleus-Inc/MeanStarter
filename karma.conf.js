// Karma configuration
// Generated on Wed May 30 2018 17:30:22 GMT-0300 (-03)
module.exports = function(config) {

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine','jasmine-matchers'],

    plugins: [
      'karma-babel-preprocessor',
      'karma-jasmine-matchers',
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-ng-html2js-preprocessor',
      'karma-mocha-reporter',
      'karma-coverage'
    ],

    // list of files / patterns to load in the browser
    files: [

      /* Inject dependencies */
      'node_modules/jquery/dist/jquery.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/underscore/underscore.js',
      'node_modules/angular-animate/angular-animate.min.js',
      'node_modules/angular-br-filters/release/angular-br-filters.min.js',
      'node_modules/chart.js/dist/Chart.min.js',
      'node_modules/angular-chart.js/dist/angular-chart.min.js',
      'node_modules/angular-input-masks/releases/angular-input-masks-standalone.min.js',
      'node_modules/angular-loaders/dist/angular-loaders.min.js',
      'node_modules/angular-local-storage/dist/angular-local-storage.min.js',
      'node_modules/angular-locale-pt-br/angular-locale_pt-br.js',
      'node_modules/angular-messages/angular-messages.min.js',
      'node_modules/angular-modal-service/dst/angular-modal-service.min.js',
      'node_modules/moment/min/moment.min.js',
      'node_modules/angular-moment/angular-moment.min.js',
      'node_modules/angular-route/angular-route.min.js',
      'node_modules/angular-sanitize/angular-sanitize.min.js',
      'node_modules/angular-table/dist/angular-table.min.js',
      'node_modules/angular-validation-match/dist/angular-validation-match.min.js',
      'node_modules/zxcvbn/dist/zxcvbn.js',
      'node_modules/angular-zxcvbn/dist/angular-zxcvbn.min.js',
      'node_modules/tether/dist/js/tether.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'node_modules/daemonite-material/js/material.min.js',
      'node_modules/string-mask/src/string-mask.js',
      'node_modules/ngstorage/ngStorage.min.js',
      'node_modules/ng-file-upload/dist/ng-file-upload.min.js',
      'node_modules/bootstrap-layout/dist/bootstrap-layout.js',
      'node_modules/socket.io-client/dist/socket.io.js',
      'node_modules/moment/locale/pt-br.js',
      'node_modules/@cgross/angular-notify/dist/angular-notify.min.js',
      'node_modules/cloudinary-core/cloudinary-core-shrinkwrap.min.js',
      'node_modules/cloudinary_ng/js/angular.cloudinary.js',
      'node_modules/slick-carousel/slick/slick.min.js',
      'node_modules/angular-slick-carousel/dist/angular-slick.min.js',

      'public/app/app.js',
      'public/dist/config.js',
      'public/app/factories/configs/ConfigFactory.js',
      'public/app/services/users/account/AccountService.js',
      'public/app/views/**/*.html',

      /*Inject Tests*/
      'public/specs/**/**/*.spec.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'public/specs/**/**/*.spec.js': 'babel',
      'public/app/factories/configs/ConfigFactory.js': 'babel',
      'public/app/services/users/account/AccountService.js': ['babel','coverage'],
      'public/app/app.js': 'babel',
      'public/dist/config.js': 'babel',
      'public/app/views/**/*.html': ['ng-html2js','babel']
    },

    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        sourceMap: 'inline'
      },
      filename: function (file) {
        return file.originalPath.replace(/\.spec\.js$/, '.es5.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha','coverage'],

    coverageReporter: {
      type : 'text-summary'
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
