<template>
  <div class="login-container">
    <!-- 左侧表单 -->
    <div class="left">
      <div class="title-box">
        <img src="@/assets/login_icon.png" alt />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="sub-title">用户登录</span>
      </div>
      <!-- 表单 -->
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="login-form">
        <el-form-item prop="phone">
          <el-input v-model="loginForm.phone" placeholder="请输入手机号" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-col :span="16">
            <el-input v-model="loginForm.code" placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <!-- 验证码图片 -->
            <img
              src="http://127.0.0.1/heimamm/public/captcha?type=login"
              class="captcha"
              ref="captcha"
              @click="getRandomCode"
            />
          </el-col>
        </el-form-item>
        <!-- 协议复选框 -->
        <el-form-item class="rule-box" prop="checked">
          <el-checkbox v-model="loginForm.checked">
            我已经阅读并同意
            <el-link type="primary">用户协议</el-link>
            <span>和</span>
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item class="btn-box">
          <el-button class="loginBtn" type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button class="register" type="primary" @click="registerFormVisible = true">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右侧图片 -->
    <div class="right">
      <img src="../../assets/login_bg.png" />
    </div>
  </div>
</template>

<script>
// 导入登录接口
import { login } from "@/api/login.js";
// import axios from 'axios';
// 导入验证逻辑
import { checkMobile, checkAgree} from '@/utils/validator.js';
// 数据 获取的接口
import { setToken } from "@/utils/token.js";
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        phone: "",
        password: "",
        code: "",
        checked: false
      },
      rules: {
        phone: [
          { required: true, message: "手机号不能为空" },
          { validator: checkMobile }
        ],
        password: [
          { required: true, message: "密码不能为空" },
          { min: 4, max: 12, message: "密码长度为6~12个字符" }
        ],
        code: [
          { required: true, message: "验证码不能为空" },
          { min: 4, max: 4, message: "验证码长度为4" }
        ],
        checked: [{ validator: checkAgree }]
      },
      registerFormVisible: false
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //登录接口
          login(this.loginForm).then(res => {
            console.log(res);
            //保存token
            setToken(res.data.data.token);
            //跳转首页
            this.router.push("/index");
          });
        } else {
          this.$message.warning("请检查输入的内容");
          return false;
        }
      });
    },
    getRandomCode() {
      // 时间戳
      this.$refs.captcha.src = `http://127.0.0.1/heimamm/public/captcha?type=login&${Date.now()}`;
      // 随机数
      // this.$refs.captcha.src=`http://127.0.0.1/heimamm/public/captcha?type=login&${Math.random()}`
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  display: flex;
  justify-content: space-around;
  align-items: center;
  .left {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 42px;
    .title-box {
      display: flex;
      align-items: center;
      font-size: 22px;
      img {
        width: 22px;
        height: 17px;
      }
      .title {
        margin-left: 14px;
      }
      .line {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-left: 14px;
        margin-right: 14px;
      }
    }
    .login-form {
      margin-top: 26px;
      .el-form-item {
        margin-bottom: 26px;
      }
      .captcha {
        width: 110px;
        height: 42px;
      }
      .el-button {
        width: 100%;
        margin-bottom: 26px;
      }
      .register {
        margin-left: 0;
      }
    }
  }
  .right {
    width: 633px;
    height: 435px;
  }
}
</style>