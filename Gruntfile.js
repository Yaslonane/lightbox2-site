module.exports = function(grunt) {

  grunt.initConfig({
    host_config: grunt.file.readJSON('.host_config'),
    autoprefixer: {
      options: {
         browsers: ['last 2 versions']
      },
      dist: {
        files: {
          'dist/css/screen.css': 'src/css/screen.css'
        }
      },
    },
    clean: ['src/css'],
    connect: {
      server: {
        options: {
          port: 8000
        }
      }
    },
    copy: {
      images: {
        files: [
          {
            expand: true,
            cwd: 'src/images/',
            src: ['**'],
            dest: 'dist/images'
          }
        ],
      },
      jquery: {
        files: {
            'dist/js/jquery.min.js': 'node_modules/jquery/dist/jquery.min.js'
        }
      },
      lightbox2: {
        files: [
          {
            expand: true,
            cwd: 'node_modules/lightbox2/dist',
            src: ['**'],
            dest: 'dist/'
          }
        ]
      }
    },
    'ftp-deploy': {
      build: {
        auth: {
          host: '<%- host_config.host %>',
          port: '<%- host_config.port %>',
          authKey: 'login'
        },
        src: './dist',
        dest: '<%- host_config.directory %>',
        exclusions: [
          '.*'
        ]
      }
    },
    highlight: {
      task: {
        files: {
          'dist/index.html': ['src/index.html']
        }
      }
    },
    htmllint: {
      all: ['dist/index.html']
    },
    sass: {
      dist: {
        files: {
          'src/css/screen.css' : 'src/sass/screen.sass'
        }
      }
    },
    watch: {
      sass: {
        files: ['src/sass/*.sass'],
        tasks: ['sass', 'autoprefixer'],
      },
      highlight: {
        files: ['src/index.html'],
        tasks: ['highlight'],
      },
      htmllint: {
        files: ['dist/index.html'],
        tasks: ['htmllint'],
      }
    }
  });

  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks('grunt-highlight');
  grunt.loadNpmTasks('grunt-html');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('default', ['build', 'connect', 'watch']);
  grunt.registerTask('build', ['highlight', 'htmllint', 'sass','autoprefixer', 'copy', 'clean']);
  grunt.registerTask('deploy', ['ftp-deploy']);
};
