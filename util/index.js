/**
 * 工具对象
 */
var util = exports = module.exports = {};


/**
 * 未登录不能访问改页面
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
util.checkLogin = function(req,res,next){
    if(!req.session.user){
        req.flash("error","未登录");
        return res.redirect("/login");
    }
    next();
}

/**
 * 登录之后不能访问该页面
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
util.checkNotLogin = function(req,res,next){
    if(req.session.user){
        req.flash("error","已登录");
        return res.redirect("/");
    }
    next();
}


/** 将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * 例子：
 * fmt="yyyy-MM-dd hh:mm:ss.S" ==> 2006-07-02 08:09:04.423
 * fmt=("yyyy-M-d h:m:s.S"      ==> 2006-7-2 8:9:4.18
 * @param {Date} date
 * @param {String} fmt 格式化字符串
*/
 util.formatDate = function(date,fmt){
    var o = {
        "M+" : date.getMonth()+1,                 //月份
        "d+" : date.getDate(),                    //日
        "h+" : date.getHours(),                   //小时
        "m+" : date.getMinutes(),                 //分
        "s+" : date.getSeconds(),                 //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S"  : date.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}