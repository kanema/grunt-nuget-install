/*
 * grunt-nuget-install
 * https://github.com/Su/nuget-install
 *
 * Copyright (c) 2013 
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Configuration to be run (and then tested).
    nuget_install: {
      files: ['tmp/Client.Project.sln']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  
  grunt.registerTask('install', ['nuget_install']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint']);

};
