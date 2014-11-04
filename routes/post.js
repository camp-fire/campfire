/**
 * Created by zhangjun on 14-8-4.
 * 博客发送路由
 */
var express = require('express');
var router = express.Router();
var util = require("../util");
var Blog = require("../model/Blog");
var ObjectID = require("mongodb").ObjectID;

router.route("/insert").post(util.checkLogin).post(function(req, res) {
    var b = {};
    b.userName = req.session.user.name;
    b.content = req.body.content;
    var blog = new Blog(b);
    blog.insert(function(err, result) {
      if(err || !result) {
        req.flash("error", "推送失败，再试一次？");
      } else {
        req.flash("success", "推送成功");
      }
      return res.redirect("/users/" + blog.userName);
    });
  });

router.route("/remove").get(util.checkLogin).get(function(req, res) {
    var b = {};
    b.userName = req.session.user.name;
    b._id = new ObjectID(req.query._id);
    var blog = new Blog(b);
    blog.remove(function(err, result) {
      if(err || !result) {
        req.flash("error", "删除失败，再试一次？");
      } else {
        req.flash("success", "删除成功");
      }
      return res.redirect("/users/" + blog.userName);
    });
  });

module.exports = router;