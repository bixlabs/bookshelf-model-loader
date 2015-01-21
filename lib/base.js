'use strict';

module.exports = function ModelBase(bookshelf) {
  var BaseModel = require('bookshelf-modelbase')(bookshelf);
  var Base = BaseModel.extend({
    soft: true,
    hasTimestamps: true,

    fetch: function (options) {
      this.softDeletes(options);
      return bookshelf.Model.prototype.fetch.apply(this, arguments);
    },


    fetchAll: function (options) {
      this.softDeletes(options);
      return bookshelf.Model.prototype.fetchAll.apply(this, arguments);
    },


    /**
     * Add the deleted_at check to the query
     *
     * @param options
     * @returns {Promise}
     */
    softDeletes: function (options) {
      if (this.soft === true && !options.withTrashed) {
        this.query('whereNull', this.tableName + '.' + 'deleted_at');
      }
    }
  });

  return bookshelf.model('Base', Base);
};