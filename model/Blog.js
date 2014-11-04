var mongodb = require("db");
var util = require("../util");

/**
 * Created by zhangjun on 14-9-3.
 * 博客类
 */

function Blog(blog) {

  /**
   * ObjectID
   */
  this._id = blog._id;
  this.userName = blog.userName;
  this.content = blog.content;
  if(blog.time) {
    this.time = blog.time;
  } else {
    this.time = util.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");
  }
  /**
   * 删除标志位,默认为0,删除操作将标记此字段为1
   */
  this.deleteFlag = 0;
}

exports = module.exports = Blog;


/**
 * 根据条件query 查询blog数据
 *
 * Query
 * - **selectors** 数据库查询条件 类似：{name:'zz'}
 * - **options** 数据库查询参数 可以提供的参数详见collection.find API
 * @param {Object} query
 * @param {Function} callback
 */
Blog.get = function(query, callback) {

  mongodb.open(function(err, db) {
    if(err) {
      return callback(err);
    }
    db.collection("blogs", function(err, collection) {
      if(err) {
        mongodb.close();
        return callback(err);
      }
      collection.find(query.selectors, query.options).toArray(function(err, docs) {
        mongodb.close();
        if(docs && docs.length > 0) {
          var blogs = [];
          docs.forEach(function(doc, index) {
            var _blog = new Blog(doc);
            blogs.push(_blog);
          });
          return callback(err, blogs);
        } else {
          return callback(err, null);
        }
      });
    });
  });
}

/**
 * 发表博客
 * @param {Function} callback
 */
Blog.prototype.insert = function(callback) {
  var _blog = this;
  mongodb.open(function(err, db) {
    if(err) {
      return callback(err);
    }
    db.collection("blogs", function(err, collection) {
      if(err) {
        mongodb.close();
        return callback(err);
      }
      collection.ensureIndex("userName");
      collection.insert(_blog, {w: 1}, function(err, result) {
        mongodb.close();
        return callback(err, result);
      });
    });
  });
}


/**
 * 更新博客数据
 * @param {Function} callback
 */
Blog.prototype.update = function(callback) {
  var _blog = this;
  mongodb.open(function(err, db) {
    if(err) {
      return callback(err);
    }
    db.collection("blogs", function(err, collection) {
      if(err) {
        mongodb.close();
        return callback(err);
      }
      var selector = {userName: _blog.userName, _id: _blog._id};
      collection.update(selector, _blog, {w: 1}, function(err, result) {
        mongodb.close();
        return callback(err, result);
      });
    });
  });
}

/**
 * 删除博客数据
 * @param callback
 */
Blog.prototype.remove = function(callback) {
  var _blog = this;
  mongodb.open(function(err, db) {
    if(err) {
      return callback(err);
    }
    db.collection("blogs", function(err, collection) {
      if(err) {
        mongodb.close();
        return callback(err);
      }

      var selector = {userName: _blog.userName, _id: _blog._id};
      var del = {$set: {deleteFlag: 1}}
      collection.update(selector, del, {w: 1}, function(err, result) {
        mongodb.close();
        return callback(err, result);
      });
    });
  });
}






