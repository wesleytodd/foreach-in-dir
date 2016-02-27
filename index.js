var fs = require('fs');
var path = require('path');
var parallel = require('run-parallel');
var through2 = require('through2');

module.exports = foreachInDir;
module.exports.recursive = recursiveForeachInDir;
module.exports.stream = streamForEachInDir;
module.exports.streamRecursive = streamRecursiveForEachInDir;

// Execute a callback for each file in a directory
function foreachInDir (dirpath, fnc, done) {
	// Read the files
	fs.readdir(dirpath, function (err, files) {
		// Return error
		if (err) {
			return done(err);
		}

		// Process each file
		parallel(files.map(function (f) {
			return fnc.bind(null, f);
		}), done);
	});
}

function recursiveForeachInDir (dirpath, fnc, done, __origDirPath) {
	foreachInDir(dirpath, function (filename, done2) {
		var filepath = path.join(dirpath, filename);
		fs.lstat(filepath, function (err, stat) {
			if (err) {
				return done2(err);
			}

			fnc(filepath.replace((__origDirPath || dirpath) + '/', ''), function () {
				// If directory, recurse into it
				if (stat.isDirectory()) {
					return recursiveForeachInDir(filepath, fnc, done2, __origDirPath || dirpath);
				}

				done2();
			});
		});
	}, done);
}

function streamForEachInDir (dirpath) {
	var stream = through2.obj();
	forEachInDir(dirpath, function (file, done) {
		stream.write(file);
		done();
	}, function (err) {
		if (err) {
			return stream.emit('error', err);
		}
		stream.end();
	});
	return stream;
}

function streamRecursiveForEachInDir (dirpath) {
	var stream = through2();
	stream.setEncoding('utf8');
	recursiveForeachInDir(dirpath, function (file, done) {
		stream.write(file, 'utf8');
		done();
	}, function (err) {
		if (err) {
			return stream.emit('error', err);
		}
		stream.end();
	});
	return stream;
}
