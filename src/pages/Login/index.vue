<template>
    <section class="main">
        <div class="logo text-center">
            <h1> <a href="index.html"> Welcome To E-Life Manage System</a></h1>
        </div>
        <div class="content-w3ls text-center">
            <img src="../../assets/images/admin.png" alt="" class="img-responsive">
            <form  @submit.prevent="login">
                <div class="wthree-field">
                    <input v-model="userName" name="text1" id="text1" type="text"  placeholder="Username" required />
                </div>
                <div class="wthree-field">
                    <input v-model="password" name="password" id="myInput" type="Password" placeholder="Password" />
                </div>

                <div class="wthree-field">
                    <button type="submit" class="btn">Sign In</button>
                </div>
                <div class="login-bottom">
                    <a href="#url" class="">Forget password？</a>
                </div>
            </form>

            
        </div>
        <div class="copyright">
            <p>Simpler, faster and more humanized !!!</p>
            <!-- <input :v-model="code"/> -->
        </div>
    </section>

</template>

<script>
import {reqCaptcha,reqLoginByAccount,reqGetLoginAccount} from '@/api/index'

export default {
    data(){
        return{
            userName:'',
            password:'',
            code:''
        }
    },
    methods:{
        //获取验证码
        getVCode(){

        },
        // 获取登陆用户的信息
        async getLoginAccount(token){
            let res = await reqGetLoginAccount(token); //获取登录用户的信息
            if(res.code===200){
                this.$store.commit('LOGINACCOUNT',res.data);
                this.$router.push({
                    name:'Home'
                })
            }
            else{
                console.log('用户信息获取失败')
            }
        },
        //发送登录请求：
        async login(){
            let _this=this;
            let res = await reqLoginByAccount(this.userName,this.password);
            if(res.code !== 200){
                // _this.$confirm("您的帐户或密码错误","登陆失败",
                // {
                //     confirmButtonText:"确认",
                //     type:"error"
                // })
                this.$alert('您的账号或密码错误，请重新登录', '登陆失败', {
                confirmButtonText: '确定',
                type:"error"
                });
                return ;
            } 
            this.$store.dispatch('token',res.data.token);
            // console.log(this.$store.state.user.token);
            this.getLoginAccount(res.data.token)
        },


    }
}
</script>

<style scoped>

/* reset code */
html {
    scroll-behavior: smooth;
}

body,
html {
    margin: 0;
    padding: 0;
    color: #585858;
}

* {
    box-sizing: border-box;
    font-family: 'Noto Sans JP', sans-serif;
}


/*  wrapper */
.wrapper {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}

@media (min-width: 576px) {
    .wrapper {
        max-width: 540px;
    }
}

@media (min-width: 768px) {
    .wrapper {
        max-width: 720px;
    }
}

@media (min-width: 992px) {
    .wrapper {
        max-width: 960px;
    }
}

@media (min-width: 1200px) {
    .wrapper {
        max-width: 1140px;
    }
}

/*  /wrapper */

.d-grid {
    display: grid;
}

button,
input,
select {
    -webkit-appearance: none;
    outline: none;
}

button,
.btn,
select {
    cursor: pointer;
}

a {
    text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
ol {
    margin: 0;
    padding: 0;
}

body {
    background: #f1f1f1;
    margin: 0;
    padding: 0;
}

form,
fieldset {
    border: 0;
    padding: 0;
    margin: 0;
}

body a:hover {
    text-decoration: none;
}

.clearfix {
    clear: both;
}

/* content */

/*
  Responsive form elements
  Flexbox layout
*/

/*/////////////// GLOBAL STYLES ////////////////////*/

body {
    font-family: 'Noto Sans JP', sans-serif;
}
.main {
    background: url(../../assets/images/bg.jpg) no-repeat bottom;
    background-size: cover;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    -ms-background-size: cover;
    min-height: 100vh;
    padding: 2em 0;
    position: relative;
    z-index: 1;
    justify-content: center;
    display: grid;
    align-items: center;
}
.main:before {
    position: absolute;
    content:'';
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: -1;
}
.text-center {
    text-align: center;
}

/*/////////////// FONT STYLES ////////////////////*/

.content-w3ls {
    margin: 2em auto;
    padding: 2em 2em;
}
.content-w3ls img{
    margin-bottom: 2em;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
    border: 4px solid rgb(255 255 255 / 9%);
    display: inline-block;
    width: 64px;
    height: 64px;
    background: #fff;
    border-radius: 50%;
    padding: 14px;
}
.logo h1 a {
    font-size: 42px;
    color: #fff;
    text-transform: capitalize;
    font-weight: 700;
}
/*/////////////// FORM STYLES ////////////////////*/
.wthree-field {
    margin-bottom:14px;
}
.wthree-field input {
    padding: 14px 30px;
    font-size: 16px;
    color: #999;
    letter-spacing: 0.5px;
    border: 1px solid #e1e1e1;
    background: #fff;
    box-sizing: border-box;
    font-family: 'Noto Sans JP', sans-serif;
    width: 100%;
    border-radius: 35px;
    -webkit-border-radius: 35px;
    -moz-border-radius: 35px;
    -ms-border-radius: 35px;
    -o-border-radius: 35px;
}

::-webkit-input-placeholder { /* Edge */
    color: #999;
  }
  
  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color:  #999;
  }
  
  ::placeholder {
    color: #999;
  }

.wthree-field button.btn {
    background: #EA4C89;
    border: none;
    color: #fff;
    padding: 14px 14px;
    text-transform: uppercase;
    font-family: 'Noto Sans JP', sans-serif;
    font-size: 16px;
	width:100%;
    letter-spacing:1px;
    outline: none;
    cursor: pointer;
    transition: 0.5s all;
    -webkit-transition: 0.5s all;
    -moz-transition: 0.5s all;
    -o-transition: 0.5s all;
    -ms-transition: 0.5s all;
    border-radius: 35px;
	-webkit-border-radius: 35px;
	-moz-border-radius: 35px;
	-ms-border-radius: 35px;
    -o-border-radius: 35px;

}
.wthree-field button.btn:hover {
    background:#de3d7b;
}
.login-bottom {
    margin-top:3em;
}
.login-bottom a {
    font-size: 16px;
    color: #fff;
    font-weight: normal;
    letter-spacing: 1px;
    padding: 0 5px;
    text-transform: capitalize;
}

.copyright {
    padding: 0 20px;
}
.copyright p {

    color: #fff;
    font-size: 16px;
    line-height: 26px;
    text-align: center;
    letter-spacing: 1px;

}
.copyright p a {
    color: #fff;
}
.copyright p a:hover,.login-bottom a:hover {
    color:#EA4C89;
}
/* -- Responsive code -- */
@media screen and (max-width: 1280px) {
}
@media screen and (max-width: 1080px) {
}
@media screen and (max-width: 900px) {
}
@media screen and (max-width: 800px) {
}
@media screen and (max-width: 768px) {
	.logo h1 a {
		font-size: 30px;
	}
}
@media screen and (max-width: 668px) {

}
@media screen and (max-width: 600px) {
}
@media screen and (max-width: 568px) {
}

@media screen and (max-width: 480px) {
    
}

@media screen and (max-width: 415px) {
	.logo {
		margin-bottom: 10px;
    }
    .content-w3ls {
        padding: 2em 2em;
    }
}

@media screen and (max-width: 384px) {
    .content-w3ls {
        padding: 1em 1em;
        margin: 1em auto;
    }
    .copyright p {
        letter-spacing: .5px;
    }
}

@media screen and (max-width: 375px) {
    
}
@media screen and (max-width: 320px) {
    
}

</style>