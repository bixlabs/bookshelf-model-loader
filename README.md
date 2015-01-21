# Bookshelf Model Loader

An opinionated model loader for [Bookshelf](http://bookshelfjs.org/).
Inspired by [Ghost](https://github.com/TryGhost/Ghost).

Also includes [bookshelf-modelbase](https://www.npmjs.com/package/bookshelf-modelbase).

## Installation

`npm install bookshelf-model-loader --save`

## Usage

During your application's startup phase load the module calling the `init` method. Pass your bookshelf instance in along with the `path` to the directory you want to autoload your models from.

```
var bookshelf = require('bookshelf')(knex);

require('bookshelf-model-loader').init(bookshelf, {
    plugins: ['virtuals', 'visibility', 'registry'], // Optional - Any bookshelf plugins to load. Defaults to all
    excludes: [], // Optional - Names of files to ignore
    path: __dirname + '/models' // Required
});
```

Then, elsewhere in the application simply:

```
var Models = require('bookshelf-model-loader');
```
