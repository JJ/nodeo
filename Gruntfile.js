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
	},
	browserify: {
	    standalone: {
		src: [ 'app/classic-ea.js' ],
		dest: './dist/nodeo.standalone.js',
		options: {
		    browserifyOptions: {
			standalone: 'nodeo'
		    }
		}
	    },
	    trap: {
		src: [ 'app/classic-ea-trap.js' ],
		dest: './dist/trap.standalone.js',
		options: {
		    browserifyOptions: {
			standalone: 'nodeo'
		    }
		}
	    }
	    
	}
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-docco');
    grunt.loadNpmTasks('grunt-browserify');

    // Default task.
    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('docs', ['docco']);
    grunt.registerTask('browsify', ['browserify']);

};
