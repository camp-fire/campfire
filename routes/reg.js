/**
 * Created by zhangjun on 14-8-4.
 * 注册路由
 */

var express = require("express");
var router = express.Router();
var User = require("../model/User");

router.route("/")
    .get(function(req,res){
        res.render("reg",{title:"用户注册"});
    })
    .post(function(req,res){
        var user = new User(req.body.name,req.body.password);
        if(user.password !== req.body.confirmPassword){
            req.flash("error","两次输入的密码不一致");
            res.redirect("/reg");
        }else{
            User.get(user.name,function(err,_user){
                if(_user){
                    err = "用户已经存在";
                }
                if(err){
                  req.flash("error",err);
                  return res.redirect("/reg");
                }
                //保存操作
                user.save(function(err){
                    if(err){
                        req.flash("error",err);
                        return res.redirect("/reg");
                    }
                    req.session.user = user;
                    req.flash("success","注册成功");
                    return res.redirect("/");
                });

            });
        }

    });

module.exports = router;

