'use strict';

var Promise = require('bluebird');
var _ = require('lodash');

module.exports = function ModelBase(bookshelf) {

  var BaseModel = require('bookshelf-modelbase')(bookshelf);

  var Base = BaseModel.extend({
      soft: true,

      permittedAttributes: function () {
        return [];
      },

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
        if (this.soft === true && (!options || !options.withTrashed)) {
          this.query('whereNull', this.tableName + '.' + 'deleted_at');
        }
      }
    }, {

      paginate: function (filter, options) {

        var where = _.pick(filter, this.prototype.permittedAttributes());

        filter = _.defaults(filter, {
          page: 1,
          perPage: 20,
          sort: 'id',
          direction: 'asc'
        });

        var countQuery = bookshelf.knex(this.prototype.tableName)
          .count('id as count')
          .where(where)
          .then(parseTotal);

        function parseTotal(total) {
          return parseInt(total[0].count);
        }

        var dataQuery = this.forge().query(buildQuery).fetchAll(options);

        function buildQuery(qb) {
          qb.where(where);
          qb.limit(filter.perPage);
          qb.offset(filter.perPage * (filter.page - 1));
          qb.orderBy(filter.sort, filter.direction);
          return qb;
        }

        return Promise.props({
          totalItems: countQuery,
          data: dataQuery
        })
          .then(formatQueriesResponse);

        function formatQueriesResponse(results) {
          return {
            items: results.data || [],
            meta: {
              totalItems: results.totalItems,
              currentPage: filter.page,
              totalPages: Math.ceil(results.totalItems / filter.perPage)
            }
          };
        }
      }
    }
  );

  return bookshelf.model('Base', Base);
};
