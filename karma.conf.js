module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            'www/lib/jquery/dist/jquery.min.js',
            'www/lib/lodash/dist/lodash.min.js',
            'www/lib/angular/angular.min.js',
            'www/lib/angular-mocks/angular-mocks.js',
            'www/lib/angular-ui-router/release/angular-ui-router.min.js',
            'www/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'www/app/**/*.js',
            'test/**/*.js'
        ],
        preprocessors: {
            'www/app/**/*.js': ['coverage']
        },
        exclude: [],
        reporters: ['teamcity', 'coverage'],
        port: 9876,
        browsers: ['PhantomJS'],
        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-coverage',
            'karma-teamcity-reporter'
        ],
        singleRun: true,
        coverageReporter: {
            dir: 'build/coverage/',
            reporters: [
                {type: 'html', subdir: 'html'}
            ]
        }
    })
};