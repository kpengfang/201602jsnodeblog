var express = require('express');
var router = express.Router();
var Model = require('../db');
//用户注册
router.get('/reg', function(req, res, next) {
  //这是相对路径，是相对于views的相对路径
  res.render('user/reg', { title: '注册' });
});
/**
 * 1. 任意长度的输入会产生相同长度的输出。
 * 2. 不能从输出的字符串还原来输入的内容
 * 3. 不同的输入一定会产生不同的输出
 */
function md5(str){
    // 先指定算法 然后指定输入 输出的时候指定编码
    return require('crypto').createHash('md5').update(str).digest('hex');
}
//注册 得到请求体中的对象并保存到数据库
router.post('/reg', function(req, res, next) {
   var user = req.body;//得到请求体
   //创建一个entity并保存到数据库中
  user.avatar = "https://secure.gravatar.com/avatar/"+md5(user.email)+"?s=48";
    user.password = md5(user.password);
   new Model.User(user).save(function(err,doc){
     if(err){
        console.error(err);
        res.redirect('back');//回到上一个页面
     }else{
         console.log(doc);
       res.redirect('/');
     }
   });
});

//用户登陆
router.get('/login', function(req, res, next) {
  res.render('user/login', { title: '登录' });
});

//用户退出
router.get('/logout', function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
