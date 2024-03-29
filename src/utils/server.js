import Vue from 'vue'
import axios from 'axios'
import qs from 'qs';
//公共路径
// let portUrl = "http://www.mangoya.cn/port/";
// let portUrl = "http://"+window.location.host+"/";
let portUrl = process.env.BACKEND_URL;

/**
 * 用户登录
 * @param {用户账号} username 
 * @param {密码} password 
 * @param {回调} callback 
 */
const UserLogin =  (username,password,callback) =>{
    let url = portUrl + 'auth/oauth/token';
    var params = qs.stringify({
        'username': username,
        'password': password,
        'grant_type': 'password',
     })
    axios.post( url ,params,{headers:{'Authorization':'Basic cmVzb3VyY2Utc2VydmVyOnJlc291cmNlLXNlcnZlcg=='}})
        .then(num => {callback && callback(num.data)})
        .catch(error =>  { callback && callback(error.response)})
}

/**
 * 用户登录
 * @param {用户账号} username 
 * @param {密码} password 
 * @param {回调} callback 
 */
 const UserLogin2 =  (username,password,callback) =>{
    let url = portUrl + 'blog/login';
    var params = {
        'account': username,
        'password': password
    }
    axios.post( url ,params,{headers:{'Authorization':'Basic cmVzb3VyY2Utc2VydmVyOnJlc291cmNlLXNlcnZlcg=='}})
        .then(num => {callback && callback(num.data)})
        .catch(error =>  { callback && callback(error.response)})
}

/**
 * 查询文章分类
 * @param {当前页数}} current 
 * @param {分页大小} size 
 * @param {回调函数} callback 
 */
const blogCategoryData = (current,size,search,callback) => {

    // 获取token
    var user = JSON.parse(sessionStorage.getItem('user'));
    let token = '';
    if(user != undefined && user != null){
      token = user.token_type+' '+user.access_token;
    }

    // 请求参数
    let url = portUrl + 'blog/category';
    var params = {
        'current': current,
        'size': size,
        'name':search.name
    }

    axios.get(url,{
        params:params,
        headers:{'Authorization':token}
    }).then(num => {
        if(num.data.code== '0000'){
            callback && callback(num.data.data)
        }else{
            alert("查询失败");
        }
    })
}

/**
 * 文章分类下拉框
 */
const blogCategorySelection = (callback)=>{
    // 获取token
    var user = JSON.parse(sessionStorage.getItem('user'));
    let token = '';
    if(user != undefined && user != null){
      token = user.token_type+' '+user.access_token;
    }

    // 请求参数
    let url = portUrl + 'blog/category/selection';
    axios.get(url,{headers:{'Authorization':token}
    }).then(num => {
        if(num.data.code== '0000'){
            callback && callback(num.data.data)
        }else{
            alert("查询失败");
        }
    })
}

/**
 * 新增or编辑博文类别
 * @param {博文类别对象} category 
 * @param {回调} callback 
 */
const saveOrEditCategory = (category,callback) =>{
    // 获取token
    var user = JSON.parse(sessionStorage.getItem('user'));
    let token = '';
    if(user != undefined && user != null){
      token = user.token_type+' '+user.access_token;
    }

    // 请求参数
    let url = portUrl + 'blog/category';
    // 发送请求
    axios.post( url,category
        ,{headers:{'Authorization':token}}
    ).then(num => {
        callback && callback(num.data)
    }).catch(error =>  { console.log(error)})
}

/**
 * 删除分类数据
 * @param {删除ID} id 
 * @param {成功回调} successCb 
 * @param {失败回调} failCb 
 */
const removeCategory = (id,successCb,failCb) => {
    // 获取token
    var user = JSON.parse(sessionStorage.getItem('user'));
    let token = '';
    if(user != undefined && user != null){
      token = user.token_type+' '+user.access_token;
    }
    // 请求参数
    let url = portUrl + 'blog/category';
    axios.delete(url,{
        params:{ 'id': id  },
        headers:{'Authorization':token}
    }).then(num => {
        if(num.data.code == '0000'){
            successCb && successCb(num.data)
        }else{
            failCb && failCb(num.data)
        }
    }).catch(error =>  { console.log(error)});
}

/**
 * 博文分页列表
 * @param {*} current 
 * @param {*} size 
 * @param {*} search 
 * @param {*} callback 
 */
const blogDatas = (current,size,search,callback) => {
    // 获取token
    var user = JSON.parse(sessionStorage.getItem('user'));
    let token = '';
    if(user != undefined && user != null){
      token = user.token_type+' '+user.access_token;
    }

    // 请求参数
    let url = portUrl + 'blog/post/page';
    var params = {
        'current': current,
        'size': size,
        'catagoryName':search.catagoryName,
        'categoryId':search.categoryId,
        'title':search.title
    }

    axios.get(url,{
        params:params,
        headers:{'Authorization':token}
    }).then(num => {
        if(num.data.code== '0000'){
            callback && callback(num.data.data)
        }else{
            alert("查询失败");
        }
    })

}

/**
 * 删除博文
 * @param {删除ID} id 
 * @param {成功回调} successCb 
 * @param {失败回调} failCb 
 */
 const removeBlog = (id,successCb,failCb) => {
    // 获取token
    var user = JSON.parse(sessionStorage.getItem('user'));
    let token = '';
    if(user != undefined && user != null){
      token = user.token_type+' '+user.access_token;
    }
    // 请求参数
    let url = portUrl + 'blog/post';
    axios.delete(url,{
        params:{ 'id': id  },
        headers:{'Authorization':token}
    }).then(num => {
        if(num.data.code == '0000'){
            successCb && successCb(num.data)
        }else{
            failCb && failCb(num.data)
        }
    }).catch(error =>  { console.log(error)});
}

/**
 * 保存、更新博文
 * @param {博文信息} blog 
 * @param {成功回调} successCb 
 * @param {失败回调} failCb 
 */
const saveEditBlog = (blog,successCb,failCb) =>{
    // 获取token
    var user = JSON.parse(sessionStorage.getItem('user'));
    let token = '';
    if(user != undefined && user != null){
      token = user.token_type+' '+user.access_token;
    }
    // 请求参数
    let url = portUrl + 'blog/post';
    // 发送请求
    axios.post( url,blog
        ,{headers:{'Authorization':token}}
    ).then(num => {
        if(num.data.code == '0000'){
            successCb && successCb(num.data)
        }else{
            failCb && failCb(num.data)
        }
    }).catch(error =>  { console.log(error)})
}

/**
 * 获取博文内容html
 * @param {博客ID} blogId 
 * @param {成功回调} successCb 
 * @param {失败回调} failCb 
 */
const blogInfo = (blogId) => {
    // 获取token
    var user = JSON.parse(sessionStorage.getItem('user'));
    let token = '';
    if(user != undefined && user != null){
      token = user.token_type+' '+user.access_token;
    }

    let url = portUrl + 'blog/post/info/'+blogId;
    return new Promise((resolve,reject)=>{
        axios.get(url,{headers:{'Authorization':token}
        }).then(num => {
            
            if(num.data.code == '0000'){
                resolve(num.data.data);
                // successCb && successCb(num.data.data)
            }else{
                reject(num.data);
                // failCb && failCb(num.data)
            }
        })
    })
}

const upload = (file,successCb,failCb) => {
    // 获取token
    var user = JSON.parse(sessionStorage.getItem('user'));
    let token = '';
    if(user != undefined && user != null){
      token = user.token_type+' '+user.access_token;
    }

    let url = portUrl + 'blog/file/upload/';
    let formdata = new FormData();
    formdata.append("file",file);

    axios({
        method: "post", // post方法
        url: url, // 请求上传图片服务器的路径
        headers: {
            // 配置headers请求头
            Authorization: token, // token认证，看后台
            "Content-Type": "application/x-www-form-urlencoded", // 采用表单上传的方式，看后台如何接受
        },
        data: formdata, // 请求数据formdata
    }).then((res) => {
        if (res.data.code !== '0000') {
            // 上传失败执行此方法，将失败信息填入参数中
            failure("HTTP Error: " + res.data.message);
            return;
        }
        // 上传成功之后，将对应完整的图片路径拼接在success的参数中
        successCb(process.env.PIC_URL + res.data.data.fileUrl);
    }).catch(res => {
        failCb(res);
    })
}

export {
        /**
         * 用户管理
         */
        UserLogin,

        /**
         * 博文管理
         */
        blogCategoryData,
        blogCategorySelection,
        saveOrEditCategory,
        removeCategory,
        blogDatas,
        removeBlog,
        saveEditBlog,
        blogInfo,
        upload,
        UserLogin2,
}
