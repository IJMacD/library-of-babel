module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      dist: {
        files: [
          {
            cwd: 'src/',
            expand: true,
            src: '*.html',
            dest: 'dist/'
          },
          {
            cwd: 'src/',
            expand: true,
            src: '*.css',
            dest: 'dist/'
          }
        ]
      }
    },
    browserify: {
      dist: {
        src: 'src/index.js',
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      dist: {
        src: '<%= browserify.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      static: {
        files: ["src/*.html", "src/*.css"],
        tasks: "copy"
      },
      js: {
        files: "src/*.js",
        tasks: "default"
      }
    },
    'gh-pages': {
      options: {
        base: "dist"
      },
      src: ["**"]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['copy', 'browserify', 'uglify']);

};
