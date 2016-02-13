# Run a function on each file in a directory

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status](https://travis-ci.org/wesleytodd/foreach-in-dir.svg?branch=master)](https://travis-ci.org/wesleytodd/foreach-in-dir)
[![js-happiness-style](https://img.shields.io/badge/code%20style-happiness-brightgreen.svg)](https://github.com/JedWatson/happiness)

[npm-image]: https://img.shields.io/npm/v/foreach-in-dir.svg
[npm-url]: https://npmjs.org/package/foreach-in-dir
[downloads-image]: https://img.shields.io/npm/dm/foreach-in-dir.svg
[downloads-url]: https://npmjs.org/package/foreach-in-dir

Runs an asyncronous function on each file in a directory in parallel.

## Usage

```
$ npm install --save foreach-in-dir
```

```javascript
var forEachInDir = require('foreach-in-dir');
var path = require('path');
var fs = require('fs');

var dir = './dir';
forEachInDir(dir, function (filename, done) {
	// do something with file
	fs.readfile(path.join(dir, filename, done);
}, function (err, results) {
	if (err) {
		return throw err;
	}

	// results is an array of the contents of each file
});

// Also has a recursive method
forEachInDir.recursive(dir, function (filename, done) {
	// ...
});
```
