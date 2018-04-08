export default {
  loginName: {
    label: '账号',
    width: 80,
    filter: {
      type: 'input',
      like: true
    },
    form: {
      type: 'input',
      rules: [
        { required: true, message: '请输入账号', trigger: 'blur' }
      ]
    }
  },
  loginPassword: {
    label: '密码',
    form: {
      type: 'password',
      rules: [
        { required: true, message: '请输入密码', trigger: 'blur' }
      ]
    }
  },
  name: {
    label: '姓名',
    width: 110,
    filter: {
      width: 100,
      type: 'input',
      like: true
    },
    form: {
      rules: [
        { required: true, message: '请输入姓名', trigger: 'blur' }
      ],
      type: 'input'
    }
  },
  enabled: {
    label: '启用状态',
    width: 100,
    sort: true,
    type: 'select',
    relation: 'enabled',
    filter: {
      type: 'select',
      width: 100
    },
    form: {
      type: 'select'
    }
  },
  roleIds: {
    label: '角色',
    type: 'select',
    form: {
      type: 'select',
      dataType: 'number',
      rules: [
        { required: true, message: '请选择角色', trigger: 'blur' }
      ]
    },
    relation: 'roleId'
  },
  linkPhone: {
    label: '电话',
    width: 130,
    filter: {
      type: 'input',
      like: true
    },
    form: {
      type: 'input'
    }
  },
  createdAt: {
    width: 110,
    label: '创建时间',
    type: 'time',
    dateType: 'YYYY-MM-DD',
    filter: {
      width: 100,
      type: 'daterange'
    },
    sortable: 'custom'
  },
  updatedAt: {
    width: 110,
    label: '更新时间',
    type: 'time',
    dateType: 'YYYY-MM-DD',
    filter: {
      width: 100,
      type: 'daterange'
    },
    sortable: 'custom'
  },
  remark: {
    label: '备注',
    // width: 200,
    form: {
      type: 'textarea'
    }
  },
  parentId: {
    label: '上级菜单',
    type: 'select',
    form: {
      // type: 'cascader',
      // onlySelectLeaf: false
      type: 'select'
    },
    relation: 'menuId'
  },
  label: {
    label: '菜单名称',
    form: {
      type: 'input'
    },
    filter: {
      width: 100,
      type: 'input',
      like: true
    }
  },
  url: {
    label: '路径',
    form: {
      type: 'input'
    }
  },
  icon: {
    label: '图标',
    form: {
      type: 'input'
    }
  },
  type: {
    label: '类型',
    type: 'select',
    form: {
      type: 'select'
    },
    options: [{
      label: '模块',
      value: 'MODULE'
    }, {
      label: '页面',
      value: 'PAGE'
    }]
  },
  noMenu: {
    label: '显示菜单',
    type: 'select',
    form: {
      type: 'select'
    },
    relation: 'noMenu'
  },
  roleName: {
    label: '角色名称',
    form: {
      type: 'input',
      rules: [
        { required: true, message: '请输入角色名称', trigger: 'blur' }
      ]
    },
    filter: {
      type: 'input'
    }
  },
  roleDesc: {
    label: '角色描述',
    form: {
      type: 'textarea'
    }
  },
  configName: {
    label: '配置名称',
    form: {
      type: 'input'
    },
    filter: {
      type: 'input'
    }
  },
  configValue: {
    label: '配置值',
    form: {
      type: 'input'
    },
    filter: {
      type: 'input'
    }
  },
  configType: {
    label: '配置类型',
    form: {
      type: 'input'
    },
    filter: {
      type: 'input'
    }
  },
  menuIds: {
    label: '权限列表',
    form: {
      type: 'tree'
    },
    relation: 'menuId'
  }
}
