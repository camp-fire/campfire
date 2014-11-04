var express = require('express');
var router = express.Router();
var Blog = require("../model/Blog");
var User = require("../model/User");
var ObjectID = require("mongodb").ObjectID;

/**
 * 用户界面
 * 包括功能：
 * 1.展示已经发表的言论
 * 2.展示其他人的言论
 */

router.param("userName", function(req, res, next, userName) {
  req.userName = userName.trim();
  res.locals.kind = req.kind = req.query.kind !== "detail" ? null : req.query.kind;

  User.get(req.userName, function(err, user) {
    if(err) {
      req.flash("error", err);
      return
    }
    if(!user) {
      req.flash("error", "小朋友你太淘气了╮(╯▽╰)╭");
      return res.redirect("/");
    }
    next();
  });
});

router.route("/:userName").get(function(req, res) {
    var query = {};
    query.selectors = {userName: req.userName, deleteFlag: 0};
    if(req.kind === "detail") {
      query.selectors._id = new ObjectID(req.query._id);
    }
    query.options = {limit: 100, sort: [
      ['time', "descending"]
    ]};
    Blog.get(query, function(err, blogs) {
      if(err) {
        req.flash("error", err);
        return res.redirect("/");
      }
      if(!blogs) {
        blogs = [];
        var user = req.session.user;
        if(user && user.name === req.userName) {
          res.locals.info = "还没有发言？赶快来一发吧~";
        }
      }
      return res.render("users", {userName: req.userName, blogs: blogs});
    });
  });

module.exports = router;
