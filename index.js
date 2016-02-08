var fs = require('fs');
var parallel = require('run-parallel');

// Execute a callback for each file in a directory
module.exports = function foreachInDir (dirpath, fnc, done) {
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
};
