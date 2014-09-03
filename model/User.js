
var mongodb = require("db");
var crypto = require("crypto");

function User(name,password){
    this.name=name;
    this.password=password;
}

module.exports = User;


/**
 * 保存操作
 * @param {Function} callback 回调函数
 */
User.prototype.save = function(callback) {

    //密码加密
    var md5 = crypto.createHash('md5');
    var password = md5.update(this.password).digest("base64");
    var name = this.name;

    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection("users", function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }

            //创建名称唯一索引
            collection.ensureIndex('name', {unique: true});

            //插入记录
            collection.insert({name: name, password: password}, {w: 1}, function (err, result) {
                mongodb.close();
                return callback(err);
            });
        });
    });
}

/**
 * 查询用户操作
 * @param {String} userName 用户姓名
 * @param {Function} callback 回调函数
 */
User.get = function(userName,callback) {
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection("users",function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }

            collection.findOne({name:userName},function(err,doc){
                mongodb.close();

                if(doc){
                    //获取user对象
                    var user = new User(doc.name,doc.password);
                    return callback(err,user);
                }else{
                    return callback(err,null);
                }
            });
        });
    });
}

