var helpers = {
    user : function(req,res){
        return req.session.user;
    },
    error: function(req,res){
        var error =  req.flash("error");
        if(error && error.length!=0){
            return error;
        }else{
            return null;
        }
    },
    success:function(req,res){
        var success = req.flash("success");
        if(success && success.length!=0){
            return success;
        }else{
            return null;
        }
    },
    info:function(req,res){
        var info = req.flash("info");
        if(info && info.length!=0){
            return info;
        }else{
            return null;
        }
    }
}
module.exports = helpers;