<template>
    <div class="login-container">
        <el-form :model="ruleForm2" :rules="rules2"
         status-icon
         ref="ruleForm2" 
         label-position="left" 
         label-width="0px" 
         class="demo-ruleForm login-page">
            <!-- <h3 class="title">系统登录</h3> -->
            <el-form-item prop="username">
                <el-input type="text" 
                    v-model="ruleForm2.username" 
                    auto-complete="off" 
                    placeholder="用户名"
                ></el-input>
            </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" 
                        v-model="ruleForm2.password" 
                        auto-complete="off" 
                        placeholder="密码"
                    ></el-input>
                </el-form-item>
            <el-checkbox 
                v-model="checked"
                class="rememberme"
            >记住密码</el-checkbox>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {UserLogin2} from '../../utils/server.js'
export default {
    data(){
        return {
            logining: false,
            ruleForm2: {
                username: 'admin',
                password: '123456',
            },
            rules2: {
                username: [{required: true, message: 'please enter your account', trigger: 'blur'}],
                password: [{required: true, message: 'enter your password', trigger: 'blur'}]
            },
            checked: false
        }
    },
    methods: {
        handleSubmit(event){
            this.$refs.ruleForm2.validate((valid) => {
                if(valid){
                    this.logining = true;
                    // 请求登录接口
                    UserLogin2(this.ruleForm2.username,this.ruleForm2.password,(response) => {
                        if(response == undefined){
                            this.logining = false;
                            this.$alert('帐号错误', '登录失败', { confirmButtonText: 'ok'})
                        }else{
                            if(response.code === '0000'){
                                var accessToken = response.data.token;
                                if(accessToken != null && accessToken != undefined){
                                    this.logining = false;
                                    sessionStorage.setItem('user',JSON.stringify({"token_type":"","access_token":accessToken}));
                                    this.$router.push({path: '/system'});
                                }else{
                                    this.logining = false;
                                    this.$alert(response.data.msg, '登录失败', { confirmButtonText: 'ok'});
                                }
                                
                            }else{
                                this.logining = false;
                                this.$alert('帐号错误', '登录失败', { confirmButtonText: 'ok'})
                            }
                        }
                    })
                }else{
                    console.log('error submit!');
                    return false;
                }
            })

            // this.$refs.ruleForm2.validate((valid) => {
            //     if(valid){
            //         this.logining = true;
            //         // 请求登录接口
            //         UserLogin(this.ruleForm2.username,this.ruleForm2.password,(response) => {
            //             if(response == undefined){
            //                 this.logining = false;
            //                 this.$alert('服务错误', '登录失败', { confirmButtonText: 'ok'})
            //             }else{
            //                 var accessToken = response.access_token;
            //                 if(accessToken != null && accessToken != undefined){
            //                     this.logining = false;
            //                     sessionStorage.setItem('user',JSON.stringify(response));
            //                     this.$router.push({path: '/system'});
            //                 }else{
            //                     this.logining = false;
            //                     this.$alert(response.data.msg, '登录失败', { confirmButtonText: 'ok'});
            //                 }
            //             }
            //         })

            //     }else{
            //         console.log('error submit!');
            //         return false;
            //     }
            // })
        }
    }
};
</script>

<style scoped>
.login-container {
    width: 100%;
    height: 100%;
}
.login-page {
   border-radius: 5px;
    position: absolute;
    /* margin: auto; */
    /* margin-left: 40%; */
    /* margin-top: 15%; */
    top: 30%;
    left: 35%;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    -webkit-box-shadow: 0 0 25px #cac6c6;
    box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
}
</style>