'use strict';

var Models = require('../../');

var User = Models.Base.extend({
  tableName: 'users',

  setContext: function (filter, context) {
    filter.account_id = context.account.id;
    return filter;
  }
});

module.exports = {
  User: Models.Bookshelf.model('User', User)
};
