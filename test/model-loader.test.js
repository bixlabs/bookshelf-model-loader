'use strict';
var expect = require('chai').expect;
var knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './tests.sqlite'
  }
};
var Bookshelf = require('bookshelf');
var bookshelf = Bookshelf(require('knex')(knexConfig));

describe('bookshelf-model-loader tests', function () {

  it('should throw an error if the `path` isn\'t defined', function () {
    expect(function () {
      require('../').init(bookshelf);
    }).to.throw('You must specify the `path` option');
  });


  it('shouldn\'t add the base model if specified', function () {
    var Models = require('../').init(bookshelf, {
      excludes: ['user.js'],
      includeBase: false,
      path: __dirname + '/models'
    });

    expect(Models.Base).to.be.undefined();
  });


  it('should add the base model to itself', function () {
    var Models = require('../').init(bookshelf, {
      path: __dirname + '/models'
    });

    expect(Models.Base).to.exist();
    expect(Models.Bookshelf).to.exist();
  });


  it('should add the required model to itself', function () {
    var Models = require('../').init(bookshelf, {
      path: __dirname + '/models'
    });

    expect(Models.User).to.exist();
  });

  it('should have a `paginate` method', function () {
    var Models = require('../').init(bookshelf, {
      path: __dirname + '/models'
    });

    expect(Models.User.paginate).to.exist();
  });

});


