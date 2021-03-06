export const baseColumns = {
  code: {
    label: '订单编号',
    size: 10,
    width: 165,
    filter: {
      width: 80,
      type: 'input',
      like: true
    },
    form: {
      type: 'input',
      size: 8
    },
    sortable: 'custom'
  },
  clientName: {
    label: '客户名称',
    width: 110,
    filter: {
      width: 100,
      type: 'input',
      like: true
    },
    form: {
      type: 'input',
      size: 6,
      rules: [
        { required: true, message: '请输入客户名称', trigger: 'blur' }
      ]
    }
  },
  deliveryPrice: {
    label: '出货金额',
    width: 110,
    filter: {
      type: 'input'
    },
    form: {
      type: 'input',
      size: 8
    },
    sortable: true
  },
  storageType: {
    label: '仓库名称',
    width: 110,
    type: 'select',
    filter: {
      width: 115,
      type: 'select'
    },
    form: {
      type: 'select',
      size: 6,
      rules: [
        { required: true, message: '请选择仓库名称', trigger: 'blur' }
      ]
    },
    relation: 'storageType',
    sortable: true
  },
  linkMan: {
    label: '联系人',
    width: 110,
    filter: {
      width: 100,
      type: 'input',
      like: true
    },
    form: {
      type: 'input',
      size: 6,
      rules: [
        { required: true, message: '请输入联系人', trigger: 'blur' }
      ]
    }
  },
  linkPhone: {
    label: '联系电话',
    width: 110,
    filter: {
      width: 100,
      type: 'input',
      like: true
    },
    form: {
      type: 'input',
      size: 6,
      rules: [
        { required: true, message: '请输入联系电话', trigger: 'blur' }
      ]
    }
  },
  makePe: {
    label: '制单人',
    width: 110,
    size: 7,
    filter: {
      width: 100,
      type: 'input',
      like: true
    },
    form: {
      type: 'input',
      size: 8
    }
  },
  clientAddress: {
    label: '发货地址',
    width: 110,
    size: 7,
    filter: {
      width: 100,
      type: 'input',
      like: true
    },
    form: {
      type: 'input',
      size: 12,
      rules: [
        { required: true, message: '请输入发货地址', trigger: 'blur' }
      ]
    }
  },
  createdAt: {
    width: 110,
    label: '单据日期',
    type: 'time',
    dateType: 'YYYY-MM-DD',
    filter: {
      width: 100,
      type: 'daterange'
    },
    form: {
      type: 'date',
      size: 8
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
    form: {
      type: 'date'
    },
    sortable: 'custom'
  },
  remark: {
    label: '备注',
    width: 200,
    form: {
      type: 'input',
      size: 12
    },
    tableForm: {
      type: 'input'
    }
  },
  agent: {
    label: '送货员',
    type: 'custom',
    customRender: () => ' '
  },
  salesman: {
    label: '客户签名',
    type: 'custom',
    customRender: () => ' '
  }
}

export const formTableColumns = {
  productId: {
    label: '商品ID',
    width: 110,
    filter: {
      width: 80,
      type: 'input'
    },
    tableForm: {
      type: 'input',
      remoteName: 'id'
    },
    form: {
      type: 'select'
    }
  },
  code: {
    label: '商品编号',
    width: 180,
    printWidth: 80,
    filter: {
      width: 80,
      type: 'input'
    },
    form: {
      type: 'select'
    },
    tableForm: {
      type: 'remoteSelect',
      remoteName: 'code'
    },
    type: 'custom',
    customRender: (data, full) => {
      return full.product.code
    }
  },
  productName: {
    label: '商品名称',
    width: 230,
    filter: {
      width: 100,
      type: 'input',
      like: true
    },
    form: {
      type: 'select'
    },
    tableForm: {
      type: 'remoteSelect',
      remoteName: 'name'
    },
    type: 'custom',
    customRender: (data, full) => {
      return full.product.name
    }
  },
  unit: {
    label: '单位',
    printWidth: 40,
    width: 100,
    type: 'custom',
    filter: {
      type: 'select',
      like: true
    },
    form: {
      type: 'select'
    },
    tableForm: {
      type: 'select',
      remoteName: 'unit'
    },
    customRender: (data, full, column) => {
      const option = column.options.find(option => option.value === full.product.unit)
      return option ? option.label : '-'
    },
    relation: 'unit'
  },
  deliveryNum: {
    label: '数量',
    printWidth: 40,
    width: 130,
    filter: {
      type: 'input'
    },
    tableForm: {
      type: 'number',
      remoteName: 'productNum',
      isSum: true,
      min: 0,
      chains: [{
        name: 'productPrice',
        value: 'unitPrice',
        type: 'multiply'
      }]
    },
    form: {
      type: 'input'
    }
  },
  unitPrice: {
    label: '单价',
    printWidth: 80,
    width: 130,
    filter: {
      type: 'input'
    },
    tableForm: {
      type: 'input',
      remoteName: 'price',
      isSum: true,
      chains: [{
        name: 'productPrice',
        value: 'deliveryNum',
        type: 'multiply'
      }]
    },
    form: {
      type: 'input'
    }
  },
  productPrice: {
    label: '金额',
    printWidth: 80,
    width: 130,
    filter: {
      type: 'input'
    },
    tableForm: {
      type: 'input',
      isSum: true
    },
    form: {
      type: 'input'
    },
    sortable: true,
    isCount: true
  },
  remark: {
    label: '备注',
    printWidth: 200,
    // width: 200,
    form: {
      type: 'input'
    },
    tableForm: {
      type: 'input'
    },
    type: 'custom',
    customRender: (data, full) => {
      return ' '
    }
  }
}
