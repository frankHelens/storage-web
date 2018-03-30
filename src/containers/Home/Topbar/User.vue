<template>
  <Dropdown
    trigger="click"
    placement="bottom-end"
    @on-click="changeTopValue">
    <span class="user-name">{{userName}}</span>
    <Avatar class="user-icon" icon="person" />
    <DropdownMenu
      slot="list"
      v-for="user in userList"
      :key="user">
      <DropdownItem :name="user.name">{{user.label}}</DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>
<script>
import { logout } from '@/utils/auth'

export default {
  props: {
    realName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      userList: [{
        name: 'password',
        label: '修改密码'
      }, {
        name: 'logout',
        label: '退出登陆'
      }]
    }
  },
  computed: {
    userName () {
      return this.realName
    }
  },
  methods: {
    changeTopValue (name) {
      const _this = this
      const changeType = {
        password () {
          _this.$router.replace('/system/changePassword')
        },
        logout () {
          logout(() => {
            _this.$message({
              message: '退出成功',
              showClose: true,
              type: 'success'
            })
            _this.$router.replace('/login')
          })
        }
      }
      changeType[name]()
    }
  }
}
</script>

<style scoped lang="sass">
.user-icon
  vertical-align: middle
.user-name
  font-size: 16px
  margin-right: 5px
  @extend .user-icon
</style>
