<template>
  <div class="login-wrapper">
    <div id="login" class="login">
      <div class="login-container">
        <div class="login-form-wrapper" @keyup.enter="login">
          <div class="logo-wrapper">
            <div class="logo"><img src="./logo.png" alt=""></div>
          </div>
          <el-form class="login-form" ref="form" :model="form" label-width="60px">
            <el-form-item label="工号" class="el-input--xlarge">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" class="el-input--xlarge">
              <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="14">
                <el-form-item label=" " size="large">
                  <el-checkbox-group v-model="form.remember">
                    <el-checkbox label="记住密码" name="remember"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item>
                  <el-button class="login-form-submit" type="danger" @click="login" :disabled="buttonDisabled">登录</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/utils/auth'

export default {
  name: 'login',
  data () {
    return {
      title: '智慧水务',
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
        this.$message({
          message: '登录成功',
          showClose: true,
          type: 'success'
        })
        this.$router.replace(this.$route.query.redirect || '/')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.login-wrapper
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
.login
  display: flex
  flex-direction: column
  background: url(./bg.jpg) no-repeat
  background-size: cover
  height: 100%
  overflow: auto
.login-container
  display: flex
  flex: 1 0 auto
  align-items: center
  justify-content: center
  padding: 10px
.login-form-wrapper
  width: 640px
  padding: 10px
  background: #fff
  border-radius: 10px
.logo-wrapper
  padding: 30px
  border-radius: 10px
  background: linear-gradient(#cb3c37 0%,#9f3330 100%)
.logo
  text-align: center
.login-form
  padding: 30px 100px 0
.login-form-submit
  display: block
  width: 100%
  padding: 11px 19px
  font-size: 18px
  border-radius: 4px
</style>
