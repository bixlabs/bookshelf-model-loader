# Bookshelf Model Loader

An opinionated model loader for [Bookshelf](http://bookshelfjs.org/).
Inspired by [Ghost](https://github.com/TryGhost/Ghost).

Also includes [bookshelf-modelbase](https://www.npmjs.com/package/bookshelf-modelbase).

## Installation

`npm install bookshelf-model-loader --save`

## Usage



During your application's startup phase load the module calling the `init` method. Pass your bookshelf instance in along with the `path` to the directory you want to autoload your models from.

```
javascript

var bookshelf = require('bookshelf')(knex);

var models = require('bookshelf-model-loader').init(bookshelf, {
    path: __dirname + '/models'
});
```

Then, elsewhere in the application simply:

```
javascript

var Models = require('bookshelf-model-loader');

```