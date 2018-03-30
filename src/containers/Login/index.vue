<template lang="pug">
  .login-wrapper
    .login(id="login")
      .login-form-wrapper(@keyup.enter="login")
        .login-title {{title}}
        el-form(ref="form" :model="form" label-width="60px" label-position="top")
          el-form-item(label="账号")
            el-input(
              size="size"
              prefix-icon="el-icon-message"
              v-model="form.username")
          el-form-item(label="密码")
            el-input(
              size="size"
              prefix-icon="el-icon-goods"
              type="password"
              v-model="form.password")
          el-form-item.login-form-submit
            el-button(
              type="primary"
              @click="login") 登录
    .login-right
</template>

<script>
import { login, getAccount } from '@/utils/auth'

export default {
  name: 'login',
  data () {
    return {
      title: '仓库管理系统',
      form: {
        username: '',
        password: '',
        remember: []
      }
    }
  },
  computed: {
    buttonDisabled () {
      return this.form.username === '' || this.form.password === ''
    }
  },
  methods: {
    login () {
      login(this.form.username, this.form.password, () => {
        getAccount(response => {
          this.$router.replace(this.$route.query.redirect || '/')
        })
        this.$message({
          message: '登录成功',
          showClose: true,
          type: 'success'
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.login-wrapper
  width: 100%
  height: 100%
  display: flex
.login
  min-width: 380px
  padding: 30px
  background: #040404
  display: flex
  flex-direction: column
.login-title
  font-size: 28px
  color: #fff
  margin-bottom: 35px
.login-right
  flex: 1
  background: url(./bg.jpg) no-repeat
  background-size: 100% 100%
  // background-size: cover  
.login-form-wrapper
  display: flex
  flex-direction: column
  flex: 1 0 auto
  justify-content: center
  padding: 10px
.logo-wrapper
  padding: 30px
.login-form-submit
  margin-top: 30px
</style>
