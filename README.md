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
    plugins: ['virtuals', 'visibility', 'registry'], // Optional - Bookshelf plugins to load. Defaults to loading the 'virtuals', 'visibility' & 'registry' plugins
    excludes: [], // Optional - files to ignore
    path: __dirname + '/models' // Required
});
```

Then, elsewhere in the application simply:

```
var Models = require('bookshelf-model-loader');
```

## Creating Models
Models should export an object with a key of the name you'd like to reference the model as.

For example: `./models/user.js`;

```

'use strict';
var Models = require('bookshelf-model-loader');

var User = Models.Base.extend({
  tableName: 'users'
});

module.exports = {
  User: Models.Bookshelf.model('User', User)
};
```
The model will then be available:

```
var Models = require('bookshelf-model-loader);

Models.User.findOne();
```