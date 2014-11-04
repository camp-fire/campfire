var express = require('express');
var router = express.Router();
var Blog = require("../model/blog");


/**
 * 首页
 * 1.查看所有言论
 */
router.get('/', function(req, res) {
  var query = {};
  query.selectors = {deleteFlag: 0};
  query.options = {limit: 20, sort: [
    ['time', "descending"]
  ]};
  Blog.get(query, function(err, blogs) {
    if(err) {
      req.flash("error", err);
      return res.render("index");
    }
    return res.render("index", {blogs: blogs});
  });
});

module.exports = router;
