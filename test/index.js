/* global describe, it */
var path = require('path');
var assert = require('assert');
var forEachInDir = require('..');

describe('forEachInDir', function () {
	it('should run the method for each file and directory in the directory', function (done) {
		var calls = [];

		forEachInDir(path.join(__dirname, 'fixtures'), function (f, done) {
			calls.push(f);
			done();
		}, function (err) {
			assert(!err);
			assert.deepEqual(calls, ['dir', 'file1.js', 'file2.js']);
			done();
		});
	});

	it('should recursivly run the method on all files', function (done) {
		var calls = [];

		forEachInDir.recursive(path.join(__dirname, 'fixtures'), function (f, done) {
			calls.push(f);
			done();
		}, function (err) {
			assert(!err);
			assert.deepEqual(calls, ['dir', 'file1.js', 'file2.js', 'dir/dirfile1.js']);
			done();
		});
	});
});
