/**
 * Created by zhangjun on 14-8-4.
 * 过滤器
 * 1.编码过滤器
 * 2.会话控制
 */
var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
  res.set('Content-Type', 'text/html;charset=UTF-8');
  next();
});

router.use(function(req, res, next) {
  next();
});

module.exports = router;