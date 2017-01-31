module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concurrent: {
      target: {
        tasks: ['nodemon', 'watch'],
        options: {
            logConcurrentOutput: true
        }
      }
    },
    watch: {
      browserify: {
        files: ['src/**/*.jsx'],
        tasks: ['browserify']
      }
    },
    browserify: {
      dist: {
        options: {
          transform: [
            ['babelify', {
              presets: ['es2015', 'react']
            }]
          ],
          watch: true,
          browserifyOptions: {
            debug: true,
            insertGlobals: true
          }
        },
        src: ['src/**/*.jsx'],
        dest: 'public/bundle.js'
      }
    },
    nodemon: {
      dev: {
        script: 'server/server.js',
        options: {
          ignore: ['node_modules/**'],
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });
            nodemon.on('config:update', function () {
            setTimeout(function() {
              require('open')('http://localhost:1337');
            }, 1000);
            });
          }
        }
      }
    },
    shell: {
      prodServer: {
        command: 'git push heroku master',
        options: {
          stdout: true,
          stderr: true,
          failOnError: true
        }
      }
    },
    speck: {
      options: {
        specType: 'tape',
        specName: '--testSpec',
        logs: true
      },
      target: {
        src: ['server/**/*.js'],
        dest: 'test/'
      },
    },
    tape: {
      options: {
        pretty: true
        output: 'console'
      },
      files: ['test/**/*.js']
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-speckjs');
  grunt.loadNpmTasks('grunt-tape');

  grunt.registerTask('default', ['build', 'concurrent:target']);
  grunt.registerTask('build', ['browserify']);
  grunt.registerTask('test', ['speck', 'tape']);
  grunt.registerTask('production', ['shell']);
}