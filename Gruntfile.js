'use strict';

module.exports = function(grunt) {
    
    // Project configuration.
    grunt.initConfig({
	jshint: {
	    options: {
		jshintrc: '.jshintrc'
	    },
	    gruntfile: {
		src: 'Gruntfile.js'
	    },
	    lib: {
		src: ['lib/**/*.js']
	    },
	    test: {
		src: ['test/**/*.js']
	    }
	    
	},
	docco: {
	    debug: {
		src: ['lib/*.js'],
		options: {
		    output: 'docs/'
		}
	    }
	}
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-docco');

    // Default task.
    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('docs', ['docco']);
};
