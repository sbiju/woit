module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower:{
    	install:{
    		options:{
    			targetDir:'app/vendors',
    			layout:'byComponent',
    			install:true,
    			verbose:true,
    			cleanTargetDir:false,
    			cleanBowerDir:false
    		}
    	}
    },
    less:{
      production:{
        options: {
            paths: ['app/styles']
        },
        files:{
          'app/styles/ui.css':'app/styles/ui.less'
        }
      }
    },
    typescript: {
        base: {
            src: ['app/typescripts/*.ts'],
            dest: 'app/typescripts/models.js',
            options: {
                module: 'amd', //or commonjs 
                target: 'es5', //or es3 
                basePath: 'app/typescripts/*.ts',
                sourceMap: false,
                declaration: false
            }
        }
    },
    concat: {
      debug:{
          options: {
            separator: ';'
          },
          src: ['app/scripts/services/*.js', 
                'app/scripts/directives/validator.js', 
                'app/scripts/*/*.js', 
                'app/scripts/*.js', 
                '!app/scripts/pubkey.js'],
          dest: 'app/dist/debug/<%= pkg.name %>.js'
      },
      lib:{
          options: {
            separator: ';'
          },
          src: ['app/vendors/jquery/*.js',
                'app/vendors/bootstrap/*.js',
                'app/vendors/angular/*.js',
                'app/vendors/*/*.js',
                '!app/vendors/angular-mocks/*.js'],
          dest: 'app/dist/debug/<%= pkg.name %>-lib.js'
       },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'app/dist/release/<%= pkg.name %>-lib.min.js': ['<%= concat.lib.dest %>'],
          'app/dist/release/<%= pkg.name %>.min.js': ['<%= concat.debug.dest %>']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-typescript');

  grunt.registerTask('ts', ['typescript']);
  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('install', ['bower']);
  grunt.registerTask('default', ['less', 'ts', 'concat:lib', 'concat:debug', 'uglify']);
  grunt.registerTask('join', ['concat:release']);
  grunt.registerTask('minify', ['uglify']);
  //grunt.registerTask('release', ['less', 'ts', 'minify:release', 'injector:releasejs', 'injector:cssLib', 'injector:css']);
  grunt.registerTask('release', ['less', 'ts',]);
};