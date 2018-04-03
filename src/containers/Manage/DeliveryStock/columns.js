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
      size: 6
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
      size: 6
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
      size: 6
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
      size: 6
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
      size: 12
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
    }
  },
  unit: {
    label: '单位',
    width: 100,
    type: 'select',
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
    relation: 'unit'
  },
  deliveryNum: {
    label: '数量',
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
    sortable: true
  },
  remark: {
    label: '备注',
    // width: 200,
    form: {
      type: 'input'
    },
    tableForm: {
      type: 'input'
    }
  }
}
