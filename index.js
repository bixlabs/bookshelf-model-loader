'use strict';

var _ = require('lodash');
var RequireTree = require('require-tree');
var Bookshelf = require('bookshelf');

module.exports = {

  init: function initialize(bookshelf, options) {
    var self = this;

    options = _.defaults(options || {}, {
      excludes: [],
      plugins: ['virtuals', 'visibility', 'registry'],
      includeBase: true,
      modelOptions: {},
    });

    if (!options.path) {
      throw new Error('You must specify the `path` option');
    }

    // Register all plugins
    options.plugins.map(function (plugin) {
      return bookshelf.plugin(plugin);
    });

    self.Bookshelf = self.Bookshelf || bookshelf;

    // Load the base Model Instance
    if (options.includeBase) {
      self.Base = self.Base || require('./lib/base')(bookshelf, options.modelOptions);
    }

    // Require all files in this directory
    RequireTree(options.path, {
      filter: filterModels,
      each: loadModels
    });

    function filterModels(filename) {
      return options.excludes.indexOf(filename) === -1;
    }

    function loadModels(model) {
      // Cache its `export` object onto this object.
      _.extend(self, model);
    }

    return self;
  }
};
