var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../models/user');
var name_valid="",
    num_valid="",
    email_valid="",
    tel_valid="";
var hint = "";


router.get('/regist', function(req, res, next) { // 注册页面
    req.session.user = "";
    name_valid="";
    num_valid="";
    email_valid="";
    tel_valid="";
    res.render('index', { title:'用户注册', user: "", n_valid:name_valid, num_valid:num_valid, tel_valid:tel_valid, email_valid:email_valid});
});

router.get('/', function(req, res, next) { // 默认入口及访问权限判断
    if (req.session.user == "") {
        hint = "";
        res.redirect('/signin');
    } else if (req.query.username != undefined && req.query.username == req.session.user.username) {
        hint = "";
        res.redirect('/detail');
    } else if (req.query.username != undefined && req.query.username != req.session.user.username) {
        hint = "无权查看他人信息";
        res.redirect('/detail');
    } else {
        hint = "";
        res.redirect('/detail');
    }
});

router.post('/signin', function(req, res, next) { // 登录
	/*User.find(function(err, docs) {
    	console.log(docs);
    })*/
	var user = req.body;
    var Hash_password = getHashPassword(user.password);
	User.findOne({username:req.body['username'],
		password:Hash_password}, function(err, docs) {
		if(!err){  
            if(docs != null){   
                req.session.user = docs;
                console.log("session: ", req.session.user);
                return res.redirect('/detail');
            } else {  
                console.log('用户名或密码不正确');  
                return res.render('signin', { title: '用户登录' , hint:"用户名或密码不正确"});
            }
        } else {
            console.log("Something happend.");
        }  
    })  
});

router.post('/regist', function(req, res, next) { // 注册
	var user = req.body;
    checkOnly(user, function(exist, name, email, tel, num) {
        if (exist == true){
            console.log("注册失败");
            if (name == true) name_valid="用户名已经存在！";
            if (num == true) num_valid="学号已经存在！";
            if (tel == true) tel_valid="电话已经存在！";
            if (email == true) email_valid="邮箱已经存在！";
            return res.render('index', { title:'用户注册', user: user, n_valid:name_valid, num_valid:num_valid, tel_valid:tel_valid, email_valid:email_valid});
        } else {
            req.session.user = user;
            var Hash_password = getHashPassword(user.password);
        	var user_1 = new User({
        		username: req.body['username'],
                password: Hash_password,
        		number: req.body['number'],
        		tel: req.body['tel'],
        		email: req.body['email']
        	});  
            user_1.save(function (err, user) {  
                if(!err) {
                    res.redirect('/detail')  
                } else {
                	console.log("Save to mongodb was failed with error: ", err);
                } 
            });
        }
    });
    User.find(function(err, docs) {
    	console.log(docs);
    })
});

router.get('/signin', function(req, res, next) { // 登录页面
    req.session.user = "";
    res.render('signin', { title: '用户登录' });
});

router.post('/detail', function(req, res, next) { // 退出登录
    req.session.user = "";
    res.redirect('/signin');
});


router.get('/detail', function(req, res, next) { // 用户详情页面
    if (req.session.user == "") res.redirect('/');
    res.render('detail', { title: '用户详情', user:req.session.user, hint:hint });
});

function checkOnly(user, callback) { // 判断用户是否唯一
    var name = false;
    var num = false;
    var tel = false;
    var email = false;
    var exist = true;
    User.find({"$or":[{username: user.username},{number: user.number},
        {tel: user.tel}, {email: user.email}]}, function(err, docs) {
            if (err) {
                console.log("checkUser failed");
            } else {
                if (docs.length == 0) {
                    exist = false;
                    callback(exist);
                } else {
                    console.log(docs);
                    console.log("用户不唯一");
                    User.findOne({email:user.email},function(err,docs){  
                    if(!err){  
                        if(docs!=null) email = true;
                        User.findOne({username:user.username},function(err,docs){  
                            if(!err){  
                                if(docs!=null) name = true;
                                User.findOne({number:user.number},function(err,docs){  
                                    if(!err){  
                                        if(docs!=null) num = true;
                                        User.findOne({tel:user.tel},function(err,docs){  
                                            if(!err){
                                                if(docs!=null) tel = true;
                                            }
                                            callback(exist, name, email, tel, num);
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }    
        }
    });
}

function getHashPassword(password) { // 密码加密
    var crypto = require('crypto');
    var md5 = crypto.createHash('md5');
    md5.update(password);
    var result = md5.digest('hex');
    console.log('result ====', result);
    return result;
}


module.exports = router;
