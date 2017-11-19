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
export default {
  data () {
    return {
      userName: '超级管理员',
      userList: [{
        name: 'password',
        label: '修改密码'
      }, {
        name: 'logout',
        label: '退出登陆'
      }]
    }
  },
  methods: {
    changeTopValue (name) {
      if (name === 'password') {
        console.log(name)
      }
      if (name === 'logout') {
        console.log(name)
      }
    }
  }
}
</script>

<style scoped lang="sass">
.user-icon
  vertical-align: middle
.user-name
  font-size: 17px
  margin-right: 5px
  @extend .user-icon
</style>
