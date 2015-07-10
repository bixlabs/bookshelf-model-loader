# Bookshelf Model Loader

An opinionated model loader for [Bookshelf](http://bookshelfjs.org/).
Inspired by [Ghost](https://github.com/TryGhost/Ghost).

Also includes [bookshelf-modelbase](https://www.npmjs.com/package/bookshelf-modelbase) which the `Base` model.

## Installation

`npm install bookshelf-model-loader --save`

## Usage

During your application's startup phase load the module calling the `init` method. Pass your bookshelf instance in along with the `path` to the directory you want to autoload your models from.

```javascript
var bookshelf = require('bookshelf')(knex);

require('bookshelf-model-loader').init(bookshelf, {
    plugins: ['virtuals', 'visibility', 'registry'], // Optional - Bookshelf plugins to load. Defaults to loading the 'virtuals', 'visibility' & 'registry' plugins
    excludes: [], // Optional - files to ignore
    path: __dirname + '/models' // Required
    modelOptions: {}, // Optional - options to pass to the base model
});
```

Then, elsewhere in the application simply:

```javascript
var Models = require('bookshelf-model-loader');
```

## Creating Models
Models should export an object with a key of the name you'd like to reference the model as.

For example: `./models/user.js`;

```javascript
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

```javascript
var Models = require('bookshelf-model-loader');

Models.User.findOne();
```

## Soft Deletes
All models provide soft deletes by default. As a result, all tables are required to have a `deleted_at` column. However, you can disable soft deletes on a per model or global basis.

### Per Model
To disable soft deletes for a particular model simply add `soft: false` to the model declaration.

```javascript
var User = Models.Base.extend({
  tableName: 'users',
  soft: false
});
```

### Global
To disable soft deletes for all models by default add the `soft: false` flag to the `modelOptions` object when calling the `init()` method.

```javascript
var bookshelf = require('bookshelf')(knex);

require('bookshelf-model-loader').init(bookshelf, {
    plugins: ['virtuals', 'visibility', 'registry'], // Optional - Bookshelf plugins to load. Defaults to loading the 'virtuals', 'visibility' & 'registry' plugins
    excludes: [], // Optional - files to ignore
    path: __dirname + '/models', // Required
    modelOptions: {
      soft: false
    }
});
```
