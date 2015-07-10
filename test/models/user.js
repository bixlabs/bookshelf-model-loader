'use strict';

var Models = require('../../');

var User = Models.Base.extend({
  tableName: 'users',
});

module.exports = {
  User: Models.Bookshelf.model('User', User)
};
