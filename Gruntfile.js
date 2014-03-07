module.exports = function(grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                'src/**/*.js',
                'test/**/*.js'
            ]
        },
        jasmine: { // XXX 安装 grunt-contrib-jasmine 时请开代理, 谢谢, 不要问我为什么
            all: {
                src: 'src/underscore-tpl-ninja.js',
                options: {
                    specs: 'test/**/*spec.js',
                    vendor: ['http://underscorejs.org/underscore-min.js']
                }
            }
        }
    });

    grunt.registerTask('test', [
        'jasmine'
    ]);
};