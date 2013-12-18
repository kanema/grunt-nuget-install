/*
 * grunt-nuget-install
 * https://github.com/Su/nuget-install
 *
 * Copyright (c) 2013 
 * Licensed under the MIT license.
 */

'use strict';

var exec = require('child_process').exec;
var path = require('path');
var nuget_bin = '../bin/nuget.exe';
var numCPUs = require('os').cpus().length;
var async = require('async');
var dargs = require('dargs');

module.exports = function(grunt) {

	grunt.registerMultiTask('nuget_install', 'NuGet package update.', function() {
  
		if (process.platform !== "win32") {
			grunt.log.warn('Only valid in windows, sorry :(.');
			return;
		}

		var nuget = path.join(__dirname, nuget_bin);

		var cb = this.async();
		var options = this.options();
		var passedArgs;
		var bundleExec;
		var banner;

		// Unset banner option if set
		if (options.banner) {
			banner = options.banner;
			delete options.banner;
		}

		passedArgs = dargs(options);

		async.eachLimit(this.files, numCPUs, function (file, next) {
			var src = file.src[0];
			if (typeof src !== 'string') {
				src = file.orig.src[0];
			}

			if (!grunt.file.exists(src)) {
				grunt.log.warn('Source file "' + src + '" not found.');
				return next();
			}

			if (path.basename(src)[0] === '_') {
				return next();
			}

			var args = [nuget, 'restore', path.dirname(src)].concat(passedArgs);

			grunt.util.spawn({
				cmd: args.shift(),
				args: args,
				opts: {
				stdio: 'inherit'
			}
			}, function (error, result, code) {
				grunt.log.writeln('File "' + src + '" verify.');
				next(error);
			});
		}, cb);
	});

};
