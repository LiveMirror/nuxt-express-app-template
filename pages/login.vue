<template>
  <v-layout>
    <v-flex xs12 md8 offset-md2 text-xs-center>
      <h2 class="title logintitle">登录您的账号</h2>
      <v-card class="login">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="phone" :rules="phoneRules" :counter="11" label="手机号码" required></v-text-field>
          <v-text-field v-model="password" :rules="passwordRules" label="登录密码" type="password" required></v-text-field>
          <div class="login-action">
            <nuxt-link class="white--text" to="/forget">忘记密码</nuxt-link>
            <v-spacer></v-spacer>
            <nuxt-link class="white--text" to="/reg">没有账号？立刻注册</nuxt-link>
          </div>
          <v-spacer />
          <v-btn :disabled="!valid" @click="submit">提交</v-btn>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    phone: "",
    phoneRules: [
      v => !!v || "手机号码不能为空",
      v => /^1[34578]\d{9}$/.test(v) || "请输入正确手机号码"
    ],
    password: "",
    passwordRules: [v => !!v || "密码不能为空"]
  }),

  methods: {
    submit() {}
  }
}
</script>

<style>
.login {
  padding: 15px;
}
.logintitle {
  margin: 10px 0;
}
.login-action {
  display: flex;
}
</style>

