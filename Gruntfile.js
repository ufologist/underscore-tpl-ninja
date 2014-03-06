module.exports = function(grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({
        jasmine: { // XXX 安装jasmine时请开代理, 谢谢
            all: {
                options: {
                    specs: 'test/**/*Spec.js',
                    vendor: ['http://underscorejs.org/underscore-min.js', 'src/underscore-tpl-ninja.js']
                }
            }
        }
    });

    grunt.registerTask('test', [
        'jasmine'
    ]);
};