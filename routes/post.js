/**
 * Created by zhangjun on 14-8-4.
 * 博客发送路由
 */
var express = require('express');
var router = express.Router();

router.post('/post',function(req,res,next){
    res.send("this is post method");
});

module.exports = router;