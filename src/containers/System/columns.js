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
  // roleids: {
  //   label: '角色',
  //   type: 'multiselect',
  //   form: {
  //     type: 'multiselect',
  //     live: true,
  //     rules: [
  //       { type: 'array', required: true, message: '请选择角色', trigger: 'blur' }
  //     ]
  //   }
  // },
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
      value: 'Page'
    }]
  },
  noMenu: {
    label: '显示菜单',
    type: 'select',
    form: {
      type: 'select'
    },
    relation: 'noMenu'
  }
}
