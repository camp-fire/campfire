/**
 * Created by zhangjun on 14-8-4.
 * 评论路由
 */
var express = require('express');
var router = express.Router();

router.post('/comment', function(req, res) {
  res.send("this is comment method");
});

module.exports = router;
