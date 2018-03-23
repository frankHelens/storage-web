<template>
  <div>
    <div class="main">
      <h2 class="title">
        {{title}}
      </h2>
      <br>
      <el-row>
        <el-col :span="10">
          <smart-form
            class="form"
            :formList="formList"
            :columns="columns"
            :values="formValues"
            :buttonList="buttonList"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { fetch } from '@/utils/api'
import { logout } from '@/utils/auth'
import SmartForm from '@/components/SmartForm'

export default {
  name: 'change-password',
  components: {
    SmartForm
  },
  data () {
    return {
      title: '修改密码',
      buttonList: [{
        name: 'submit',
        label: '提交',
        type: 'primary',
        validate: true,
        func: (values) => {
          fetch({
            method: 'put',
            url: 'changePassword',
            data: {
              oldPassword: values.oldpassword,
              newPassword: values.newpassword
            }
          }).then(data => {
            if (data) {
              logout(() => {
                this.$message({
                  message: '修改密码成功，请重新登录！',
                  showClose: true,
                  type: 'success'
                })
                this.$router.replace('/login')
              })
            }
          })
        },
        funcProps: {
          aaa: 'aaa'
        }
      }],
      formValues: {
        oldpassword: '',
        newpassword: ''
      },
      formList: ['oldpassword', 'newpassword'],
      columns: {
        oldpassword: {
          label: '旧密码',
          form: {
            type: 'password',
            rules: [
              { required: true, message: '请输入旧密码', trigger: 'blur' }
            ]
          }
        },
        newpassword: {
          label: '新密码',
          form: {
            type: 'password',
            rules: [
              { required: true, message: '请输入新密码', trigger: 'blur' }
            ]
          }
        }
      }
    }
  }
}
</script>
