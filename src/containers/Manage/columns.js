export const formColumns = {
  code: {
    label: '订单编号',
    width: 160,
    filter: {
      width: 80,
      type: 'input',
      like: true
    },
    form: {
      type: 'input',
      size: 6
    },
    sortable: 'custom'
  },
  origin: {
    label: '供应商',
    width: 200,
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
  takePe: {
    label: '收货人',
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
  enterPrice: {
    label: '进货金额',
    width: 110,
    filter: {
      type: 'input'
    },
    form: {
      type: 'input',
      size: 6
    },
    sortable: true
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
      type: 'date'
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
      type: 'input'
    },
    tableForm: {
      type: 'input'
    }
  }
}

export const formTableColumns = {
  code: {
    label: '商品编号',
    width: 110,
    filter: {
      width: 80,
      type: 'input'
    },
    form: {
      type: 'select'
    },
    tableForm: {
      type: 'remoteSelect'
    }
  },
  name: {
    label: '商品名称',
    width: 110,
    filter: {
      width: 100,
      type: 'input',
      like: true
    },
    form: {
      type: 'select'
    },
    tableForm: {
      type: 'remoteSelect'
    }
  },
  unit: {
    label: '单位',
    width: 110,
    type: 'select',
    filter: {
      type: 'select',
      like: true
    },
    form: {
      type: 'select'
    },
    tableForm: {
      type: 'select'
    },
    relation: 'unit'
  },
  productNum: {
    label: '数量',
    width: 150,
    filter: {
      type: 'input'
    },
    tableForm: {
      type: 'number'
    },
    form: {
      type: 'input'
    }
  },
  unitPrice: {
    label: '单价',
    width: 110,
    filter: {
      type: 'input'
    },
    tableForm: {
      type: 'input'
    },
    form: {
      type: 'input'
    }
  },
  newPrice: {
    label: '金额',
    width: 110,
    filter: {
      type: 'input'
    },
    tableForm: {
      type: 'input'
    },
    form: {
      type: 'input'
    },
    sortable: true
  },
  remark: {
    label: '备注',
    width: 200,
    form: {
      type: 'input'
    },
    tableForm: {
      type: 'input'
    }
  }
}
