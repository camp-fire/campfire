/**
 * Created by zhangjun on 14-8-4.
 * 登陆路由
 */
var express = require("express");
var router = express.Router();

router.route("/")
    .get(function(req,res){
        req.session.user=null;
        return res.redirect("/");
    })

module.exports = router;
