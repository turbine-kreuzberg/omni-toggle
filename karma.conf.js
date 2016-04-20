// Karma configuration
// Generated on Mon Apr 18 2016 15:38:12 GMT+0200 (CEST)

module.exports = function( config ) {
    var configuration = {
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['requirejs', 'mocha', 'should', 'fixture'],

        // list of files / patterns to load in the browser
        files: [
            'test/main.js',
            {pattern: 'src/*.js', included: false},
            {pattern: 'test/*.js', included: false},

            {pattern: 'test/html/*.htm'}
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            '**/*.htm': ['html2js'],
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'verbose'],

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
        browsers: ['Chrome', 'Firefox'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        customLaunchers: {
            Chrome_Travis_Ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        }
    };

    if( process.env.TRAVIS ) {
        configuration.browsers = ['Chrome_Travis_Ci'];
    }

    config.set( configuration );
}
