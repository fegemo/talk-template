module.exports = function(grunt) {
  var port = grunt.option('port') || 8000,
      path = require('path');

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        curly: false,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        eqnull: true,
        browser: true,
        expr: true,
        globals: {
          head: false,
          module: false,
          console: false,
          unescape: false,
          require: true,
          TEMPLATES: true
        }
      },
      files: ['Gruntfile.js', 'src/js/**/*.js', '!src/js/**/*.es{5,6}.js']
    },
    csslint: {
      options: {
        'important': false,
        'adjoining-classes': false,
        'zero-units': false,
        'unique-headings': false,
        'qualified-headings': false,
        'fallback-colors': false,
        'universal-selector': false,
        'compatible-vendor-prefixes': false,
        'overqualified-elements': false,
        'box-sizing': false,
        'box-model': false,
        'unqualified-attributes': false,
        'import': false,
        'display-property-grouping': false,
        'known-properties': false,
        'vendor-prefix': false,

      },
      src: ['src/css/**/*.css']
    },
    traceur: {
      options: {
        experimental: true,
        blockBinding: true
      },
      src: {
        files: [
          {
            cwd: 'src/js',
            expand: true,
            src: ['**/*.es6.js'],
            dest: 'src/js/',
            ext: '.es5.js'
          }
        ]
      },
      samples: {
        files: [
          {
            cwd: 'src/sample/',
            expand: true,
            src: ['**/*.es6.js'],
            dest: 'src/sample/',
            ext: '.js'
          }
        ]
      }
    },
    concat: {
      js: {
        src : ['src/js/head.js', 'src/js/reveal.js', 'js/lib/handlebars.runtime.min.js', 'template/handlebars.js', 'src/js/**/*.js', '!src/js/**/*.es6.js', '!src/js/plugin'],
        dest : 'js/scripts.js'
      },
      css: {
        src:  ['src/css/*.css'],
        dest: 'css/styles.css'
      }
    },
    copy: {
      css: {
        files: [
          {
            flatten: true,
            expand: true,
            filter: 'isFile',
            src: ['src/css/print/*.css'],
            dest: 'css/print/'
          },
          {
            flatten: true,
            expand: true,
            filter: 'isFile',
            src: ['src/css/theme/*.css'],
            dest: 'css/theme/'
          }
        ]
      },
      samples: {
        files: [
          {
            flatten: true,
            expand: true,
            filter: 'isFile',
            src: ['src/sample/**/*.js'],
            dest: 'samples/'
          }
        ]
      },
      plugins: {
        files: [
        {
          cwd: 'src/js/plugin/',
          expand: true,
          src: ['**/*.js', '!**/*.es6.js'],
          dest: 'js/plugin',
          ext: '.js'
        }]
      }
    },
    replace: {
      main: {
        options: {
          patterns: [
            {
              json: grunt.file.readJSON('config.json')
            }
          ]
        },
        files: [
          {
            flatten: true,
            expand: true,
            filter: 'isFile',
            src: ['src/index.html'],
            dest: ''
          },
          {
            flatten: true,
            expand: true,
            filter: 'isFile',
            src: ['js/scripts.js'],
            dest: 'js/'
          },
          {
            flatten: true,
            expand: true,
            filter: 'isFile',
            src: ['src/README.md'],
            dest: ''
          }
        ]
      }
    },
    uglify: {
      build: {
        src: 'js/scripts.js',
        dest: 'js/scripts.min.js'
      }
    },
    cssmin: {
      main: {
        files: {
          'css/styles.min.css': ['css/styles.css'],
          'css/print/paper.min.css': ['css/print/paper.css'],
          'css/print/pdf.min.css': ['css/print/pdf.css'],
          'css/theme/avenuecode.min.css': ['css/theme/avenuecode.css']
        }
      }
    },
    sass: {
      main: {
        files: {
          'src/css/theme/avenuecode.css': 'src/css/theme/source/avenuecode.scss',
        }
      }
    },
    handlebars: {
      compile: {
        options: {
          namespace: 'TEMPLATES',
          processName: function(filePath) {
            return path.basename(filePath, '.hbs');
          }
        },
        files: [{
          src: ['src/template/*.hbs'],
          dest: 'template/handlebars.js'
        }]
      }
    },
    inject: {
      html: {
        scriptSrc: 'workflow.js',
        files: {
          'index.html': 'index.html'
        }
      },
    },
    watch: {
      main: {
        files: ['Gruntfile.js', 'src/**/*.js', 'src/**/*.css', 'src/**/*.html', 'src/**/*.hbs', 'src/README.md', 'config.json'],
        tasks: ['jshint', 'csslint', 'handlebars', 'traceur', 'concat', 'copy', 'replace', 'uglify', 'cssmin', 'inject']
      },
      theme: {
        files: ['src/css/theme/**/*.scss'],
        tasks: ['sass', 'csslint', 'concat:css', 'copy:css', 'cssmin']
      },
      options: {
        livereload: 4444
      }
    },
    connect: {
      server: {
        options: {
          port: port,
          base: '.'
        }
      }
    }
  });

  // Dependencies
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-traceur');
  grunt.loadNpmTasks('grunt-inject');

  // Default task
  grunt.registerTask('default', ['jshint', 'csslint', 'handlebars', 'traceur', 'concat', 'copy', 'replace', 'uglify', 'cssmin', 'inject', 'connect', 'watch']);

  // Compile theme
  grunt.registerTask('themes', ['sass']);

  // Build task
  grunt.registerTask('build', ['jshint', 'csslint', 'handlebars', 'traceur', 'concat', 'copy', 'replace', 'uglify', 'cssmin']);

  // Serve presentation locally
  grunt.registerTask('serve', ['connect', 'watch']);

};