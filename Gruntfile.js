/*jshint node:true */
module.exports = function(grunt) {

  grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks("grunt-contrib-jscs");
  grunt.loadNpmTasks( "grunt-contrib-cjsc" );
  grunt.loadNpmTasks("grunt-contrib-qunit");
	grunt.loadNpmTasks( "grunt-contrib-watch" );


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
		clean: ["./build/*"],
    jshint: {
      options: {
        jshintrc: ".jshintrc"
      },
      all: [ "./src/**/*.js" ]
    },
    jscs: {
        options: {
            "standard": "Jquery"
        },
        all: [ "./src" ]
    },
    cjsc: {
			debug: {
        options: {
          sourceMap: "build/*.map",
					sourceMapRoot: "../src",
          minify: false,
					config: {
						jQuery: {
							globalProperty: "jQuery"
						}
					}
         },
         files: {
            "./build/jquery.html5form.js": "./src/main.js"
         }
       },
       build: {
        options: {
          debug: false,
          minify: true,
					banner: "/*! <%= pkg.name %> - v<%= pkg.version %> - " +
                "<%= grunt.template.today(\"yyyy-mm-dd\") %> */",
					config: {
						jQuery: {
							globalProperty: "jQuery"
						}
					}
         },
         files: {
            "./build/jquery.html5form.min.js": "./src/main.js"
         }
      }
    },
    qunit: {
      all: ["tests/index.html"]
    },
		watch: {
      options: {
        livereload: false
      },
      debug: {
				files: [ "./src/**/**/**/*.js" ],
				tasks: [ "cjsc:debug" ]
      }
    }
  });

  grunt.registerTask( "test", [ "jshint", "jscs", "qunit" ]);
	grunt.registerTask( "debug", [ "jshint", "cjsc:debug" ]);
  grunt.registerTask( "build", [ "clean", , "cjsc:build" ]);
  grunt.registerTask( "default", [ "test" ]);

};
