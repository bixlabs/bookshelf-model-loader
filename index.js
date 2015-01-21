'use strict';

var _ = require('lodash');
var RequireTree = require('require-tree');

module.exports = {

  init: function initialize(bookshelf, options) {
    var self = this;

    options = _.defaults(options, {
      excludes: [],
      plugins: ['virtuals', 'visibility', 'registry'],
      includeBase: true
    });

    // Register all plugins
    options.plugins.map(function (plugin) {
      return bookshelf.plugin(plugin);
    });

    self.Bookshelf = bookshelf;

    // Load the base Model Instance
    if (options.includeBase) {
      self.Base = require('./lib/base')(bookshelf);
    }

    // Require all files in this directory
    return RequireTree(options.path, {
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
  }
};
