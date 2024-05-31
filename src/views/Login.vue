<script lang="ts" setup>
import Background from "@/assets/imgs/background.jpeg";
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
import { loginAPI } from "@/utils/api.ts";
import { useRouter, useRoute} from 'vue-router';
const router = useRouter();
import { ref } from "vue";
let loginForm = ref({
  phone_num: "",
  password: "",
});
const form = ref();
const loginRules = ref<FormRules<RuleForm>>({
  phone_num: [{ required: true, message: "账号不能为空" }],
  password: [{ required: true, message: "密码不能为空" }],
});

let loading = ref(false);
let redirect = ref(undefined);

/* 账号登录() */
const submitForm = async (formEl: FormInstance | undefined) => {
  console.log("formEl", formEl);
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    console.log("valid", valid);
    if (valid) {
      const { phone_num, password } = loginForm.value;
      let data = {
        phone_num,
        password,
      };
      let response = await loginAPI(data);
      let token = response[0].token;
      localStorage.setItem('token', token);
      router.push({
        path:'/administration'
      })


    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<template>
  <div class="login">
    <el-form
      ref="form"
      :model="loginForm"
      :rules="loginRules"
      label-position="left"
      label-width="0px"
      class="login-form"
    >
      <h3 class="title">后台管理系统</h3>
      <el-form-item prop="phone_num">
        <el-input
          v-model="loginForm.phone_num"
          type="text"
          auto-complete="off"
          placeholder="账号"
        >
          <svg-icon
            slot="prefix"
            icon-class="user"
            class="el-input__icon input-icon"
          />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="submitForm(form)"
        >
          <svg-icon
            slot="prefix"
            icon-class="password"
            class="el-input__icon input-icon"
          />
        </el-input>
      </el-form-item>
      <!-- <el-form-item prop="code">
        <el-input v-model="loginForm.code" auto-complete="off" placeholder="验证码" style="width: 63%" @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode">
        </div>
      </el-form-item> -->

      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width: 100%"
          @click.native.prevent="submitForm(form)"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss">
.login {
  display: flex;
  justify-content: center;
  height: 100vh;
  background-size: cover;
  align-items: center;
  width: 100vw;
  // position:absolute;
  background: url("../assets/imgs/background.jpeg");
}
.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 385px;
  padding: 25px 25px 5px 25px;
  height: 260px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  display: inline-block;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
</style>
