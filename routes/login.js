/**
 * Created by zhangjun on 14-8-4.
 * 登陆路由
 */
var express = require("express");
var router = express.Router();
var User = require("../model/User");
var crypto = require("crypto");
var util = require("../util");

router.route("/")
    .get(util.checkNotLogin)
    .get(function(req,res){
        res.render("login");
    })
    .post(util.checkNotLogin)
    .post(function(req,res){

        var md5 = crypto.createHash("md5");
        var password = md5.update(req.body.password).digest("base64");
        User.get(req.body.name,function(err,doc){

            if(!doc){
                err = "用户不存在";
            }else if(password !== doc.password){
                err = "用户名或密码错误";
            }

            if(err){
                req.flash("error",err);
                return res.redirect("login");
            }

            req.session.user = doc;
            req.flash("success","登陆成功");
            return res.redirect("/");
        });
    });

module.exports = router;
