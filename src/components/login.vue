<template>
  <div class="login">
    <div class="container">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-loginForm">
      <img v-bind:src="userImg" alt="" class="avatar">
      <el-form-item prop="username" >
        <el-input v-model="loginForm.username" prefix-icon="myicon myicon-user"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" prefix-icon="el-icon-loading" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login" class="login-btn">登录</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
// import router from '@/router/index.js'
import {login} from '@/api/api_login.js'
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      },
      userImg: require('@/assets/avatar.jpg')
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          login(this.loginForm).then((res)=>{
            if(res.data.meta.status==200){
              this.$router.push({name:"system"})
            }else{
              this.$message({
          message: res.data.meta.msg,
            })
            }
          })
        } else {
          this.$message({
          message: '用户数据不合法',
          type: 'error'
        });
          return false
        }
      })
    }

  }

}
</script>

<style lang='less' scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
