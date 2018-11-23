<template>
  <v-layout>
    <v-flex xs12 md8 offset-md2 text-xs-center>
      <h2 class="title logintitle">注册您的账号</h2>
      <v-card class="login">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="phone" :rules="phoneRules" :counter="11" label="手机号码" required></v-text-field>
          <v-text-field v-model="password" :rules="passwordRules" label="登录密码" type="password" required></v-text-field>
          <v-text-field v-model="repeatpassword" :rules="repeatpasswordRules" label="确认密码" type="password" required></v-text-field>
          <v-text-field v-model="vertifycode" :rules="vertifycodeRules" label="输入验证码" required>
            <v-btn @click="sendcode" slot="append-outer" style="top: -12px">验证码</v-btn>
          </v-text-field>
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
    passwordRules: [v => !!v || "密码不能为空"],
    repeatpassword: "",
    vertifycode: "",
    vertifycodeRules: [v => !!v || "不能为空"]
  }),
  computed: {
    repeatpasswordRules: function() {
      return [this.repeatpassword == this.password || "两次密码不一致"]
    }
  },
  methods: {
    submit() {},
    sendcode() {}
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
</style>

